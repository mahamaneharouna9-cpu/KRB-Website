const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

function checkSizes() {
   const files = walk('src/assets/images');
   let badCount = 0;
   for (const f of files) {
      const stats = fs.statSync(f);
      if (stats.size === 0) {
         console.log('Zero byte file:', f);
         badCount++;
      } else if (stats.size < 100) {
         console.log('Small file (<100 bytes):', f, stats.size);
         badCount++;
      }
   }
   if (badCount === 0) console.log('All files are fine.');
}
checkSizes();
