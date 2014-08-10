'use strict';

angular.module('rcrdboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shelf', {
        url: '/shelf',
        templateUrl: 'app/shelf/shelf.html',
        controller: 'ShelfCtrl'
      });
  });