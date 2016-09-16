# postcss-css3patterns [![Build Status][ci-img]][ci] [![Coverage Status][cov-img]][cov]

[PostCSS] plugin to quickly apply patterns from Lea Verou's [CSS3 Patterns Gallery]

[PostCSS]: https://github.com/postcss/postcss
[CSS3 Patterns Gallery]: http://lea.verou.me/css3patterns/
[ci-img]:  https://travis-ci.org/dmarchena/postcss-css3patterns.svg
[ci]:      https://travis-ci.org/dmarchena/postcss-css3patterns
[cov-img]: https://coveralls.io/repos/github/dmarchena/postcss-css3patterns/badge.svg?branch=master
[cov]:     https://coveralls.io/github/dmarchena/postcss-css3patterns?branch=master

```css
.foo {
  /* Input example */
  background-pattern: "Microbial Mat";
}
```

```css
.foo {
  /* Output example */
  background: radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px), #8a3; background-size: 20px 20px;
}
```

## Usage

```js
postcss([ require('postcss-css3patterns') ])
```

See [PostCSS] docs for examples for your environment.
