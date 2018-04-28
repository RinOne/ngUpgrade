let app = angular.module('app', ['ui.router']);

app
  .constant('API_URL', 'http://www.radio-browser.info/webservice/json')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.cache = true;
  }]);
