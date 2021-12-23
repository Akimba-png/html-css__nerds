const gulp = require("gulp");
const browserSync = require("browser-sync").create();


const styles = () => {
  return gulp.src('./source/css/**/*.css')
    .pipe(browserSync.stream());
};

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: './source',
    },
  });
  done();
};

const watcher = () => {
  gulp.watch('./source/css/**/*.css', styles);
  gulp.watch('./source/*.html').on('change', browserSync.reload);
};

exports.default = gulp.series(server, watcher);
