'use strict';

angular.module('rcrdboxApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'firebase'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .service('stripe', function () {

    var handler = StripeCheckout.configure({
      key: 'pk_test_4RKgTuPrp30kDmEW69wP2mzT',
      image: 'images/recroulette.png',
      token: function(token) {
        $http.post('/api/stripeCheckout', {stripeToken : token.id, email : token.email, plan: planCode, address: token.card, ref : GetQueryStringParams('r')})
            .success(function(data) {
              //localStorageService.remove('plan');
              localStorageService.add('rcrd_e',JSON.stringify(data));
              window.location = '/done';
            })
            .error(function(data, status, headers, config) {
              alert(data[0]);
            });
      }
    });

    // Public API for configuration
    this.checkout = function (plan) {
      var planCode = plan;
      //localStorageService.remove('rcrd_e');
      //localStorageService.add('plan', plan);
      // Open Checkout with further options
      var content = (plan == 'medium') ? 'CDs' : 'records';
      handler.open({
        name: 'RCRDBOX',
        description: '10 ' + content + '/month',
        amount: 2500,
        panelLabel: 'Subscribe ({{amount}}/month)',
        shippingAddress: true
      });
    };

  }).filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});