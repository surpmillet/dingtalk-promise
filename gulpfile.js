/**
 * Created by michao on 16/7/16.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

gulp.task('clean:babel', function (cb) {
  return del(['lib/**.*'], cb);
});

gulp.task('babel', ['clean:babel'], function () {
  return gulp.src('src/**/*.js')
    .pipe(plugins.changed('lib'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel({presets: ['es2015', 'stage-0']}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('lib'))
});

gulp.task('clean:test', function (cb) {
  return del(['test/test.js'], cb);
});

gulp.task('buildTest', ['clean:test'], function () {
  return gulp.src('test/src/**.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('test.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('test'))
});

gulp.task('test', ['buildTest'], function () {
  gulp.src('test/**.js')
    .pipe(plugins.mocha());
});

var onChanged = function (event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};

var babelWatcher = gulp.watch('src/**/*.js', ['babel']);
babelWatcher.on('change', onChanged);

var testWatcher = gulp.watch('test/src/**.js', ['buildTest']);
testWatcher.on('change', onChanged);
