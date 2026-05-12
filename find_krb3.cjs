const fs = require('fs');
console.log(fs.readdirSync('.').filter(f => f.includes('WhatsApp') || f.includes('clean') || f.includes('IMG') || f.includes('pump') || f.includes('krb') || f.startsWith('\\')));
