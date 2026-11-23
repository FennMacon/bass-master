// input.scss intentionally uses plain CSS syntax, which is also valid SCSS.
// No Sass dependency is needed: keep the browser stylesheet an exact copy.
const fs = require('node:fs');
const path = require('node:path');
fs.copyFileSync(path.join(__dirname, 'input.scss'), path.join(__dirname, 'output.css'));
