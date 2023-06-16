const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
// const rtlcss = require('gulp-rtlcss');
// const rename = require('gulp-rename');
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");

sass.compiler = require("node-sass");

/*-----------------------------------------------
|   SCSS
-----------------------------------------------*/
const SRC = "src";
gulp.task("scss", () =>
  gulp
    .src(SRC + "/assets/scss/Saas.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ compatibility: "ie9" }))
    .pipe(sourcemaps.write("."))
    .pipe(plumber.stop())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream())
);

/*-----------------------------------------------
|   Watching
-----------------------------------------------*/
// gulp.task('watch', () => {
//   gulp.watch('src/assets/scss/**/*.scss', gulp.parallel('scss'));
// });

gulp.task("default", gulp.parallel("scss"));
