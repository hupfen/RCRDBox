'use strict';

angular.module('rcrdboxApp')
  .controller('DoneCtrl', function ($scope, localStorageService) {
    var email = localStorageService.get('rcrd_e');
    if (email === null) {
      window.location = "/";
    }
    else {
      var inner = email[0];
      var token = inner.token;
      console.log(token.id);
      $scope.reflink = token.id;
      $scope.tweetlink = "https://twitter.com/home?status=Get random albums mailed to you every month. Discover something new. You know you wanna. https://rcrdbox.com/?r=" + token.id;
    }
  });
