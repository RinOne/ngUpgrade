app
  .component('searchMenu', {
    bindings: {
      keyword: '='
    },
    templateUrl: 'directives/search/search.html',
    controller: 'searchController as searchCtrl'
  })
  .controller('searchController', function() {});
