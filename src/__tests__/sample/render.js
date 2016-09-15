import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import postcss from 'postcss';
import pug from 'pug';
import plugin  from '../../../';
import patterns from '../../data/__data__.js';

const dir = path.join(process.cwd(), 'docs/test/');
const postcssFile = path.join(dir, '_index.css');
const cssFile = path.join(dir, 'index.css');
const htmlFile = path.join(dir, 'index.html');

function renderCss() {
  const content = patterns.map((pattern, index) => {
    return `
.pattern-${index} {
  background-pattern: "${pattern.name}";
}
`;
  }).join('');

  fs.writeFile(postcssFile, content);

  postcss([ plugin ]).process(content, { from: postcssFile, to: cssFile })
    .then( result => {
        fs.writeFileSync(cssFile, result.css);
        if ( result.map ) fs.writeFileSync('app.css.map', result.map);
        console.log('css file saved!');
    });
}

function renderHtml() {
  const content = pug.renderFile(path.join(__dirname, './template.pug'), {
    patterns: patterns
  });

  fs.writeFile(htmlFile, content, err => {
    if (err) throw err;
    console.log('html file saved!');
  });
}

function main() {
  mkdirp(dir, err => {
    if (!err) {
      renderCss();
      renderHtml();
    } else {
      console.error(err);
    }
  })
}

main();