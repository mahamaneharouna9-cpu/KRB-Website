const fs = require('fs');

async function testImages() {
  const bucketUrls = require('./src/data/bucket_urls.json');

  const goodUrls = [];
  const badUrls = [];

  for (const raw of bucketUrls) {
    const url = encodeURI(raw).replace(/%25/g, '%');
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status === 200) {
        goodUrls.push(raw);
      } else {
        badUrls.push(raw);
        console.log("BAD URL: ", raw, " => ", res.status);
      }
    } catch(e) {
      console.log("ERR URL: ", raw, " => ", e.message);
      badUrls.push(raw);
    }
  }

  const fallbackPlaceholders = [
    "https://storage.googleapis.com/krbengineering/Maîtrise Environnementale/Maîtrise Environnementale/20150408_095945.jpg",
    "https://storage.googleapis.com/krbengineering/Développement Rural & Urbain/Développement Rural & Urbain/DSC03487.JPG",
    "https://storage.googleapis.com/krbengineering/Développement Rural & Urbain/Développement Rural & Urbain/20150408_125039.jpg",
    "https://storage.googleapis.com/krbengineering/Ingénierie de l'Eau & Hydraulique/Ingénierie de l'Eau & Hydraulique/DSC03612.JPG"
  ];
  
  for (const raw of fallbackPlaceholders) {
    const url = encodeURI(raw).replace(/%25/g, '%');
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status !== 200) {
         console.log("BAD FALLBACK: ", raw, " => ", res.status);
      } else {
         console.log("GOOD FALLBACK: ", raw);
      }
    } catch (e) {
      console.log("ERR FALLBACK: ", raw, " => ", e.message);
    }
  }
  
  if (goodUrls.length !== bucketUrls.length) {
    fs.writeFileSync('./src/data/bucket_urls.json', JSON.stringify(goodUrls, null, 2));
    console.log("WRITTEN " + goodUrls.length + " URLs.");
  } else {
    console.log("ALL URLS ARE GOOD.");
  }
}

testImages();
