const fs = require('fs');
function walk(dir, depth) {
  if (depth > 3) return [];
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
      if (file.toLowerCase().includes('krb') || file.toLowerCase().includes('png') || file.toLowerCase().includes('jpg') || file.toLowerCase().includes('jpeg') || file.includes('\\')) {
        results.push(dir + '/' + file);
      }
      const fullPath = dir + '/' + file;
      try {
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('proc') && !fullPath.includes('sys')) { 
          results = results.concat(walk(fullPath, depth + 1));
        }
      } catch(e) {}
    });
  } catch(e) {}
  return results;
}
console.log(walk('/', 0));
