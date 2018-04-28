app
  .component('home', {
    templateUrl: 'views/home/home.html',
    controller: 'homeViewController as homeViewCtrl'
  })
  .controller('homeViewController', function($window, $timeout, radioService) {
    let audioPlayer;
    this.searchKeyword = undefined;
    this.selectRadioCountryList = undefined;

    this.$onInit = () => {
      audioPlayer = $window.document.getElementById('audioPlayer');
      this.selectCountryToDispayRadio('France');
    };

    this.selectCountryToDispayRadio = country => {
      radioService.getRadioByCountry(country).then(radios => {
        this.selectRadioCountryList = radios;
      });
      this.country = country;
    };

    this.selectRadio = radio => {
      this.selectedRadio = radio;
      $timeout(() => {
        audioPlayer.load();
        audioPlayer.play();
      }, 1000);
    };
  });
