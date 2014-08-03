'use strict';

angular.module('rcrdboxApp')
  .controller('MainCtrl', function ($scope, $http, localStorageService) {
    
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

    var handler = StripeCheckout.configure({
      key: 'pk_test_4RKgTuPrp30kDmEW69wP2mzT',
      image: 'images/recroulette.png',
      token: function(token) {
        var plan = localStorage.getItem('plan');
        $http.post('/api/stripeCheckout', {stripeToken : token.id, email : token.email, plan: plan, address: token.card, ref : GetQueryStringParams('r')})
            .success(function(data) {
              localStorageService.remove('plan');
              localStorageService.add('rcrd_e',token.email);
              window.location = '/done';
            })
            .error(function(data, status, headers, config) {
              alert(data[0]);
            });
      }
    });
    
    $scope.checkout = function(plan) {
      localStorageService.remove('rcrd_e');
      localStorageService.add('plan', plan);
      // Open Checkout with further options
      var content = (plan == 'medium') ? 'CDs' : 'records';
      handler.open({
        name: 'RCRDBOX',
        description: '10 ' + content + '/month',
        amount: 2500,
        panelLabel: 'Subscribe ({{amount}}/month)',
        shippingAddress: true
      });
      event.preventDefault();
    };

  });