app
  .component('countries', {
    bindings: {
      keyword: '=',
      selectCountry: '='
    },
    templateUrl: 'directives/countries/countries.html',
    controller: 'countriesController as countriesCtrl'
  })
  .controller('countriesController', function(radioService) {
    this.$onInit = () => {
      radioService.getCountries().then(countries => {
        this.countriesList = countries;
      });
    };
  });
