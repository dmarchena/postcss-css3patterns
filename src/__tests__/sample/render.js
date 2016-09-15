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
  let content = [];

  Object.keys(patterns).forEach((name, index) => {
    content.push(
`.pattern-${index} {
  background-pattern: "${name}";
}
`
    );
  });

  content = content.join('');

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
    patterns: Object.keys(patterns).length
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