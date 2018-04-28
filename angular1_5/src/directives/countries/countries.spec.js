describe('Test Countries Component', () => {
  let element;
  let controller;

  const countries = ['France', 'Morocco'];

  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject(($compile, $rootScope, $controller, radioService, $q) => {
      spyOn(radioService, 'getCountries').and.returnValue($q.when(countries));

      element = angular.element('<countries></countries>');
      element = $compile(element)($rootScope.$new());
      $rootScope.$digest();
      controller = element.isolateScope().countriesCtrl;
    });
  });

  it('should check content countries list', () => {
    expect(controller.countriesList).toEqual(countries);
  });
});
