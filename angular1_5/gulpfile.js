const gulp = require('gulp');
const path = require('path');
const del = require('del');
const concat = require('gulp-concat');
const runSequence = require('run-sequence').use(gulp);
const addStream = require('add-stream');

const htmlmin = require('gulp-htmlmin');
const ngTemplate = require('gulp-angular-templatecache');

const less = require('gulp-less');
const cssmin = require('gulp-cssmin');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const ngAnnotate = require('gulp-ng-annotate');

const browserSync = require('browser-sync').create();
const karma = require('karma');

const sources = {
  entry: 'src/index.html',
  templates: [
    'src/**/*.html',
    '!src/index.html'
  ],
  fonts: ['node_modules/font-awesome/fonts/**.*'],
  styles: ['src/**/*.less'],
  scripts: [
    'src/app.js',
    'src/**/*.js',
    '!src/**/*.spec.js'
  ],
  dependenciesJS: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
  ],
  dependenciesCSS: [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/datatables.net-dt/css/jquery.dataTables.css'
  ]
};

const build = 'build/';

gulp.task('build-js-dependencies', () => {
  gulp
    .src(sources.dependenciesJS)
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest(path.join(build, 'js')));
});

gulp.task('build-js', ['build-js-dependencies'], () => {
  const prepareTemplates = () => gulp
    .src(sources.templates)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeTagWhitespace: true
    }))
    .pipe(ngTemplate({module: 'app'}));

  gulp.src(sources.scripts)
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(addStream.obj(prepareTemplates()))
    // .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(path.join(build, 'js')));
});

gulp.task('copy-icons', () => {
  gulp
    .src(sources.fonts)
    .pipe(gulp.dest(path.join(build, 'fonts')));
});

gulp.task('build-custom-css', () => {
  gulp
    .src(sources.styles)
    .pipe(less())
    .pipe(cssmin())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(path.join(build, 'css')));
});

gulp.task('build-css', ['build-custom-css', 'copy-icons'], () => {
  gulp
    .src(sources.dependenciesCSS)
    .pipe(concat('vendors.min.css'))
    .pipe(gulp.dest(path.join(build, 'css')));
});

gulp.task('build-html', () => {
  return gulp.src(sources.entry)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeTagWhitespace: true
    }))
    .pipe(gulp.dest(build));
});

gulp.task('build', ['build-html', 'build-js', 'build-css']);

gulp.task('clean', () => del(path.join(build, '*')));

gulp.task('karma', done => {
  new karma.Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('karma-watch', done => {
  new karma.Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    autoWatch: true
  }, done).start();
});

gulp.task('watch', () => {
  gulp.watch([sources.scripts, sources.templates], ['build-js']);
  gulp.watch([sources.styles], ['build-css']);
  gulp.watch([sources.entry], ['build-html']);
});

gulp.task('lint', () => {
  gulp
    .src(sources.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('server', ['clean', 'lint', 'build', 'watch'], () => {
  browserSync.init({
    browser: 'firefox',
    port: 8080,
    server: {baseDir: build}
  });

  gulp.watch([build + '/*']).on('change', browserSync.reload);
});

gulp.task('default', done => runSequence('clean', ['lint', 'karma'], 'build', done));
