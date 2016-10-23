var gulp = require('gulp');
var util = require('gulp-util');
var bowerFiles = require('main-bower-files');
var less = require('gulp-less');
var inject = require('gulp-inject');
var angularSort = require('gulp-angular-filesort');

var path =
{
  bower : './src/main/webapp/bower_components',
  js : './src/main/webapp/assets/js',
  main : './src/main/webapp/index.html',
  css : './src/main/webapp/assets/css',
  media : './src/main/webapp/assets/media',
  fonts : './src/main/webapp/assets/fonts'
}

gulp.task('default', ['assets:js','assets:css','assets:fonts','inject']);

gulp.task('assets:js', function(){
  gulp.src(bowerFiles({includeDev : true, filter: '**/*.js'}))
      .pipe(gulp.dest(path.js));
});

gulp.task('assets:css', function(){
  gulp.src([path.bower + '/bootstrap/dist/css/bootstrap-theme.css', path.bower + '/bootstrap/dist/css/bootstrap.css'])
      .pipe(gulp.dest(path.css));
});

gulp.task('assets:fonts', function(){
  gulp.src([path.bower + '/bootstrap/dist/fonts/**/*'])
      .pipe(gulp.dest(path.fonts));
});

gulp.task('inject', function () {
  var target = gulp.src('./src/main/webapp/index.html');

  var jsSrc = gulp.src(['./src/main/webapp/assets/**/*.js'], {read : true});
  target.pipe(inject(jsSrc.pipe(angularSort()), {relative : true})).pipe(gulp.dest('./src/main/webapp'));

  var cssSrc = gulp.src('./src/main/webapp/assets/css/bootstrap.css');
  return target.pipe(inject(cssSrc, {relative : true})).pipe(gulp.dest('./src/main/webapp'));
});

/*gulp.task('assets:less', function(){
  gulp.src('./bower_components/bootstrap/less/bootstrap.less')
      .pipe(less())
      .pipe(gulp.dest("./assets"));
});*/
