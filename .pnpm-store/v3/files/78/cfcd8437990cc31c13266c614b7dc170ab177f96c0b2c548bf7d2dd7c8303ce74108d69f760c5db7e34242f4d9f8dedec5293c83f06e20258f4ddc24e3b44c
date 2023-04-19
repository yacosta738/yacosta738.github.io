var fs = require('fs');

var cldr = require('cldr-core/supplemental/likelySubtags.json');
var likelySubtags = cldr.supplemental.likelySubtags;

var defaultsCode = 'var defaults = {\n';

Object.keys(likelySubtags).forEach(key => {
  if (key.indexOf('und-') === 0 || (/-[A-Z]{2}$/g).test(key)) {
    return;
  }

  var locale = likelySubtags[key];

  var split = locale.toUpperCase().split(/-|_/);
  if (split.length < 2) {
    return;
  }

  var code = split.pop();
  if (!code || code === 'ZZ' || !/^[A-Z]{2}$/.test(code)) {
    return;
  }

  if (key.indexOf('-') !== -1) {
    key = `'${key}'`;
  }

  defaultsCode += `  ${key}: '${code}',\n`;
});

defaultsCode += '};\n';

let path = `${__dirname}/index.js`;

let content = fs.readFileSync(path, 'utf-8')
  .replace(/\/\/ --- DEFAULTS START ---\n((.|\n)+)\/\/ --- DEFAULTS END ---/gm,
    `// --- DEFAULTS START ---\n${defaultsCode}// --- DEFAULTS END ---`);

fs.writeFileSync(path, content, 'utf-8');
