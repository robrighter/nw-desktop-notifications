var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
    sourceFiles: './src/**/**'
};

// setup up node-webkit-builder
var nw = new (require('node-webkit-builder'))({
    buildDir: './webkitbuilds',
    files: paths.sourceFiles,
    platforms: ['win', 'osx', 'linux32', 'linux64']
});

// tasks:

gulp.task('default', ['generate-nw']);

gulp.task('build', function(done){
    nw.build()
        .then(done)
        .catch(done);
});

gulp.task('generate-nw', function(){
    return gulp.src(paths.sourceFiles, {dot: true})
        .pipe($.zip('desktop-notify.nw'))
        .pipe(gulp.dest('./src'));
});