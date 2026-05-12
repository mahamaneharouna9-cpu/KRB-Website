const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    try {
      let stat = fs.statSync(dirPath);
      if (stat && stat.isDirectory()) {
         if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== '.next') {
            walkDir(dirPath, callback);
         }
      } else {
         callback(dirPath);
      }
    } catch (e) {
      // ignore
    }
  });
}

const images = [];
walkDir(process.cwd(), function(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
    images.push(filePath);
  }
});

console.log(JSON.stringify(images, null, 2));
