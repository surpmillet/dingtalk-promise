/**
 * Created by michao on 16/7/16.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(plugins.changed('lib'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({presets: ['es2015', 'stage-0']}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('lib'))
});

gulp.task('test', function () {
    gulp.src('test/**.js')
        .pipe(plugins.mocha());
});

var onChanged = function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};

var babelWatcher = gulp.watch('src/**/*.js', ['babel']);
babelWatcher.on('change', onChanged);
