'use strict';

angular.module('rcrdboxApp')
  .controller('NavbarCtrl', function ($scope, $location, $modal) {
    $scope.menu = [{
      'title': 'The Shelves',
      'link': '/shelf'
    },{
      'title': 'For Labels',
      'link': '/labels'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.loginModal = function () {

      var modalInstance = $modal.open({
        templateUrl: 'login.html',
        controller: LoginCtrl
      });
    };
    
    var LoginCtrl = function ($scope, $modalInstance) {

      $scope.ok = function () {
        $modalInstance.close(null);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };
  });
