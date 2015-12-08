var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var Server = require('karma').Server;
var uglify = require('gulp-uglify');

gulp.task('cq', ['jscs', 'lint']);

gulp.task('jscs', function () {
  return gulp.src([
    'table/src/*.js',
    'test/*.js'
  ])
    .pipe(jscs({configPath: '.jscsrc'}));
});

gulp.task('lint', function () {
  return gulp
    .src([
      'table/src/*.js',
      'test/*.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('compress', function () {
  return gulp.src('table/source/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('table/dist'));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});