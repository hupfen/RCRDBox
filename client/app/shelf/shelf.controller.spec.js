'use strict';

describe('Controller: ShelfCtrl', function () {

  // load the controller's module
  beforeEach(module('rcrdboxApp'));

  var ShelfCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShelfCtrl = $controller('ShelfCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
