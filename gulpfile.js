var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', ['build']);

gulp.task('build', function(){
    return gulp.src('./src/**/**', {dot: true})
        .pipe($.zip('desktop-notify.nw'))
        .pipe(gulp.dest('./src'));
});