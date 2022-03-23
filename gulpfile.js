var gulp = require('gulp'), watch = require('gulp-watch');

gulp.task('sync', function () {
  gulp.src('app/src/main/resources/**')
    .pipe(gulp.dest('app/build/resources/'));
});

gulp.task('watch', function () {
  watch('app/src/main/resources/**/*.*', gulp.series(['sync']));
});
gulp.task('default', gulp.series(['watch']));