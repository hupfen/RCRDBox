'use strict';

angular.module('rcrdboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('labels', {
        url: '/labels',
        templateUrl: 'app/labels/labels.html',
        controller: 'LabelsCtrl'
      });
  });