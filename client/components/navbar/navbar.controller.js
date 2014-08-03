'use strict';

angular.module('rcrdboxApp')
  .controller('NavbarCtrl', function ($scope, $location) {
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
  });