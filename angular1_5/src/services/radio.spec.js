describe('Test Radio Service', () => {
  let radioService;
  let $http;
  let apiUrl;

  const countries = ['France', 'Morocco'];
  const radios = [{name: 'NRJ'}, {name: 'SKYROCK'}];

  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject((_radioService_, $httpBackend, API_URL) => {
      radioService = _radioService_;
      $http = $httpBackend;
      apiUrl = API_URL;
    });
    $http.whenGET(`${apiUrl}/countries`).respond(200, countries);
    $http.whenGET(`${apiUrl}/stations/bycountry/france`).respond(200, radios);
  });

  it('should fetch countries from api', () => {
    $http.expectGET(`${apiUrl}/countries`);
    radioService.getCountries().then(data => {
      expect(data).toEqual(countries);
    });
  });

  it('should fetch radios for france', () => {
    $http.expectGET(`${apiUrl}/stations/bycountry/france`);
    radioService.getRadioByCountry('france').then(data => {
      expect(data).toEqual(radios);
    });
  });

  afterEach(() => {
    $http.flush();
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });
});
