import { categoryImages } from './src/lib/images';

const allUrls = [];
Object.entries(categoryImages).forEach(([kat, urls]) => {
  urls.forEach(u => allUrls.push(u));
});

console.log("Total urls:", allUrls.length);

async function testAll() {
  let brokenCount = 0;
  for (const u of allUrls) {
      if (u.startsWith('http')) {
         const res = await fetch(u, {method: 'HEAD'}).catch(e => ({status: 'err'}));
         if (res.status !== 200) {
             console.log("BROKEN REMOTE:", u, res.status);
             brokenCount++;
         }
      } else {
         // Local file URL like `/src/assets/images/...`
         const localPath = '.' + u.split('?')[0];
         const fs = require('fs');
         if (!fs.existsSync(localPath)) {
            console.log("BROKEN LOCAL:", u);
            brokenCount++;
         }
      }
  }
  console.log("Total broken:", brokenCount);
}

testAll();
