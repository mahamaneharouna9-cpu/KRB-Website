const fs = require('fs');
try {
  console.log(fs.readdirSync('/src/assets/images/krb_images'));
} catch (e) {
  console.log(e.message);
}
try {
  console.log(fs.readdirSync('\\\\src\\\\assets\\\\images\\\\krb_images'));
} catch (e) {
  console.log(e.message);
}
try {
  console.log(fs.readdirSync('/workspace/\\src\\assets\\images\\krb_images'));
} catch (e) {
  console.log(e.message);
}
