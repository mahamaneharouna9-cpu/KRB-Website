const fs = require('fs');
function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
      const fullPath = dir + '/' + file;
      try {
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) { 
          if (!fullPath.includes('node_modules') && !fullPath.includes('dist')) {
            results = results.concat(walk(fullPath));
          }
        } else { 
          if (file.toLowerCase().includes('png') || file.toLowerCase().includes('jpg') || file.toLowerCase().includes('jpeg') || file.toLowerCase().includes('svg')) {
            results.push(fullPath);
          }
        }
      } catch(e) {}
    });
  } catch(e) {}
  return results;
}
console.log(process.cwd());
console.log(JSON.stringify(walk('.'), null, 2));
