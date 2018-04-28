module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/app.js',
      'src/**/*.js',
      'src/**/*.spec.js',
      'src/**/*.html'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/app.js': ['babel'],
      'src/**/*.js': ['babel', 'coverage'],
      'src/**/*.spec.js': ['babel'],
      'src/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'app'
    },
    reporters: ['mocha', 'coverage'],
    mochaReporter: {
      colors: {
        success: 'green',
        info: 'blue',
        warning: 'cyan',
        error: 'red'
      }
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      check: {
        global: {
          statements: 50,
          branches: 50,
          functions: 50,
        },
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
