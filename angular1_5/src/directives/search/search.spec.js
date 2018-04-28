describe('Test Search Component', () => {
  let element;

  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject(($compile, $rootScope) => {
      element = angular.element('<search-menu></search-menu>');
      element = $compile(element)($rootScope.$new());
      $rootScope.$digest();
    });
  });

  it('should create component', () => {
    expect(element).not.toBeNull();
  });
});
