'use strict';

angular.module('rcrdboxApp')
  .controller('DoneCtrl', function ($scope, localStorageService) {
    var email = localStorageService.get('rcrd_e');
    if (email === null) {
      window.location = "/";
    }
    else {
      $scope.reflink = email.token.id;
    }
  });
