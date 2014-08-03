'use strict';

describe('Controller: DoneCtrl', function () {

  // load the controller's module
  beforeEach(module('rcrdboxApp'));

  var DoneCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DoneCtrl = $controller('DoneCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
