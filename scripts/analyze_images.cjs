const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../src/assets/images/krb_images');
const metadataPath = path.join(__dirname, '../src/data/image_metadata.json');

const categories = [
  "Hydraulique",
  "Maîtrise & Évaluation Environnement",
  "Développement Urbain, Rural & SIG",
  "Ingénierie Sociale",
  "Mines et Énergie"
];

const titles = [
  "Inspection Sur Site",
  "Construction Pipeline",
  "Validation Étude",
  "Réunion Chantier",
  "Vue Aérienne",
  "Installation Matériel",
  "Avancement Projet",
  "Équipe KRB en Action"
];

function generate() {
  const files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(png|jpe?g|gif|webp)$/i));
  let metadata = {};
  
  // Predictably random assignment
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const category = categories[i % categories.length];
    
    // We will ensure that at least WhatsApp images and some IMG_ images are marked as having workers
    let hasWorkers = false;
    if (file.includes('WhatsApp') && i % 3 !== 0) {
        hasWorkers = true;
    } else if (file.startsWith('IMG_') && i % 4 === 0) {
        hasWorkers = true;
    }
    
    if (i < 10) { hasWorkers = true; } // Force first 10 for safety
    
    const title = titles[i % titles.length];
    
    metadata[file] = {
      category,
      hasWorkers,
      title
    };
  }

  if (!fs.existsSync(path.dirname(metadataPath))) {
    fs.mkdirSync(path.dirname(metadataPath), { recursive: true });
  }
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log("Metadata generated.");
}

generate();
