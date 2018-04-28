describe('Test Home View', () => {
  let element;
  let controller;

  const countries = ['France', 'Morocco'];
  const radios = [{name: 'NRJ'}, {name: 'SKYROCK'}];

  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject(($compile, $rootScope, radioService, $q) => {
      spyOn(radioService, 'getCountries').and.returnValue($q.when(countries));
      spyOn(radioService, 'getRadioByCountry').and.callFake(country => $q.when(country === 'France' ? radios : []));
      element = angular.element('<home></home>');
      element = $compile(element)($rootScope.$new());
      $rootScope.$digest();
      controller = element.isolateScope().homeViewCtrl;
    });
  });

  it('should create component', () => {
    expect(element).not.toBeNull();
  });

  describe('Test country selected to listen radios', () => {
    it('load right radios list list for France', () => {
      controller.selectCountryToDispayRadio('France');
      expect(controller.selectRadioCountryList).toEqual(radios);
    });

    it('display right France country name', () => {
      controller.selectCountryToDispayRadio('France');
      expect(controller.country).toEqual('France');
    });
  });

  describe('Test selected radio from list', () => {
    it('select right clicked radio to play', () => {
      controller.selectRadio('NRJ');
      expect(controller.selectedRadio).toEqual('NRJ');
    });
  });
});
