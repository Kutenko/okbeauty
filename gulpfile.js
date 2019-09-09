const { src, dest, parallel, watch, series } = require('gulp');
const pug = require('gulp-pug'),
      scss = require('gulp-sass'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      cache = require('gulp-cache'),
      concat = require('gulp-concat');

function mkdir(){
  return src('*.*', {read: false})
  .pipe(dest('src/scss'))
  .pipe(dest('src/images'))
  .pipe(dest('src/images/icons'))
  .pipe(dest('src/fonts'))
  .pipe(dest('src/js'));
}

function html() {
  return src('src/*.pug')
    .pipe(pug({pretty: '\t'}))
    .pipe(dest('dist/'))
}

function css() {
    return src('src/scss/main.scss')
      .pipe(scss())
      .pipe(dest('dist/css'))
}

function img() {
  return src('src/images/**/*')
      .pipe(cache(imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      })))
      .pipe(dest('dist/images'));
}

  function js() {
    return src('src/js/*.js', js)
      .pipe(concat('app.min.js'))
      .pipe(dest('dist/js', { sourcemaps: true }))
  }

  exports.default = function() {
    watch('src', series(html, css, img, js));
  };
  
  exports.mkdir = mkdir;
  exports.html = html;
  exports.css = css;
  exports.img = img;
  exports.js = js;

// manual project assembly
// exports.default  = parallel(html, css, img, js); 