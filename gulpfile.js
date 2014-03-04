var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('default', ['package']);

gulp.task('package', function(){
    gulp.src('./*')
        .pipe(zip('desktop-notify.nw'))
        .pipe(gulp.dest('./'));
});