describe('Test Footer Component', () => {
  let element;

  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject(($compile, $rootScope) => {
      element = angular.element('<global-footer></global-footer>');
      element = $compile(element)($rootScope.$new());
      $rootScope.$digest();
    });
  });

  it('should create component', () => {
    expect(element).not.toBeNull();
  });
});
