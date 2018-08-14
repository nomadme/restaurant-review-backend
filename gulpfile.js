var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

const presets = [
  {name: '_1x', width: 340},
  {name: '_2x', width: 600}
];

gulp.task('image-resize', function () {
  presets.map((preset) => {
    gulp.src('./img/*')
      .pipe(imageResize({
        width: preset.width,
        imageMagick: true
      }))
      .pipe(rename(function (path) {
        path.basename += preset.name;
      }))
      .pipe(gulp.dest('./img/'));
  });
});

gulp.task('default', function () {
  gulp.src('./assets/**/*')
    .pipe(gulp.dest('.tmp/public/'))
});

gulp.task('watch', function () {
  return gulp.src('./assets/**/*')
    .pipe(watch('./assets/**/*.js'))
    .pipe(gulp.dest('.tmp/public/'))
});
