'use strict';

angular.module('rcrdboxApp')
  .controller('ShelfCtrl', function ($scope, $firebase, stripe) {
    var ref = new Firebase("https://songswell.firebaseio.com/shelves/");
    var sync = $firebase(ref);
    $scope.albums = sync.$asArray();
    
    $scope.sort = 'artist';
    $scope.reverse = false;
    $scope.itemsPerPage = 25;
    $scope.currentPage = 0;
    
    $scope.range = function() {
      var rangeSize = 3;
      var ret = [];
      var start;

      start = $scope.currentPage;
      if ( start > $scope.pageCount()-rangeSize ) {
        start = $scope.pageCount()-rangeSize+1;
      }

      for (var i=start; i<start+rangeSize; i++) {
        ret.push(i);
      }
      return ret;
    };
    
    $scope.prevPage = function() {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function() {
      return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
      return Math.ceil($scope.albums.length/$scope.itemsPerPage)-1;
    };

    $scope.nextPage = function() {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function() {
      return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };
    
    $scope.setPage = function(n) {
      $scope.currentPage = n;
    };
    
    function GetQueryStringParams(sParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++)
      {
          var sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] == sParam)
          {
              return sParameterName[1];
          }
      }
    };
    
    $scope.checkout = function(plan) {
      stripe.checkout(plan, GetQueryStringParams('r'));
      event.preventDefault();
    };
  });