app.factory('radioService', function($q, $http, API_URL) {
  let factory = {};

  factory.getCountries = () => {
    return $http.get(`${API_URL}/countries`).then(reponse => reponse.data);
  };

  factory.getRadioByCountry = country => {
    return $http.get(`${API_URL}/stations/bycountry/${country}`).then(reponse => reponse.data);
  };

  return factory;
});
