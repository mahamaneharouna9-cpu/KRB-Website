const fs = require('fs');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next') && !file.includes('dist')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.toLowerCase().includes('krb') || file.toLowerCase().includes('png') || file.toLowerCase().includes('jpg') || file.toLowerCase().includes('jpeg') || file.includes('\\')) {
        results.push(file + ' (' + stat.size + ' bytes)');
      }
    }
  });
  return results;
}
console.log(process.cwd());
console.log(walk('.'));
