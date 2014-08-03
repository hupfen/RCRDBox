'use strict';

angular.module('rcrdboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('done', {
        url: '/done',
        templateUrl: 'app/done/done.html',
        controller: 'DoneCtrl'
      });
  });