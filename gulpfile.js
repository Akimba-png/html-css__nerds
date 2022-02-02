const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const del = require("del");
const rename = require('gulp-rename');
const postCss = require('gulp-postcss');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cleanСss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const htmlMin = require('gulp-htmlmin');


const clean = () => {
  return del('build');
};

const minifyHtml = () => {
  return gulp.src('./source/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build'));
};

const styles = () => {
  return gulp.src('./source/css/style.css')
    .pipe(sourcemap.init())
    .pipe(cleanСss())
    .pipe(postCss([
      autoprefixer()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
};

const copy = () => {
  return gulp.src([
    './source/fonts/*.{woff2,woff}',
    './source/img/**/*.{png,jpg,svg}',
    './source/js/**/*.js',
    './source/leaflet/**/*.*'
  ],
  {
    base: 'source'
  })
    .pipe(gulp.dest('./build'))
};

const createSprite = () => {
  return gulp.src('./build/img/icons/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg",
      }
    }
  }))
  .pipe(gulp.dest('./build/img/icons'))
}

const compressImages = () => {
  return gulp.src('./build/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('./build/img'))
};

const createWebp = () => {
  return gulp.src('./build/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 50 }))
    .pipe(gulp.dest('./build/img'))
};

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: './build',
    },
  });
  done();
};

const watcher = () => {
  gulp.watch('./source/css/**/*css', styles)
  gulp.watch('./source/*.html', minifyHtml).on('change', browserSync.reload);
};

exports.default = gulp.series(
  clean,
  copy,
  gulp.parallel(
    createWebp,
    createSprite,
    minifyHtml,
    styles
  ),
  server,
  watcher
);

exports.build = gulp.series(
  clean,
  copy,
  compressImages,
  gulp.parallel(
    createWebp,
    createSprite,
    minifyHtml,
    styles
  )
);
