app
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {url: '/home', template: '<home></home>'})
      .state('contact', {url: '/contact', template: '<contact></contact>'})
      .state('about', {url: '/about', template: '<about></about>'});
    $urlRouterProvider.otherwise('home');
  });
