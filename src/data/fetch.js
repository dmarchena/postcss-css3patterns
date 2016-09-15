import cheerio from 'cheerio';
import request from 'request';
import fs from 'fs';
import path from 'path';

const jsFile = path.join(__dirname, './__data__.js');
const jsonFile = path.join(__dirname, './__data__.json');

function parseHtml(html) {
  const $ = cheerio.load(html);
  const patterns = {};
  $('#patterns > li').each(function (i, element) {
    const name = $(this).attr('title');
    const author = $(this).data('author');
    const authorUrl = $(this).data('author-url');
    const css = $(this).attr('style');
    patterns[name] = {
      css: cleanStyle(css),
      author: author,
      url: authorUrl
    };
  });
  return patterns;
}

function writeFiles(patterns) {
  const json = JSON.stringify(patterns);
  fs.writeFileSync(jsFile, `export default ${json};`);
  //fs.writeFileSync(jsonFile, json);
}

function cleanStyle(css) {
  var cleaned = css.replace(/\n/g, '')
  cleaned = cleaned.replace(/[\s]{2,}/g, ' ');
  cleaned = cleaned.replace(/,([^\s])/g, ', $1');
  cleaned = cleaned.replace(/:([^\s])/g, ': $1');
  return cleaned;
}

request('https://raw.githubusercontent.com/LeaVerou/css3patterns/master/index.html', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    writeFiles(parseHtml(html));
  }
});