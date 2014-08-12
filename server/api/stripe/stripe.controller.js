'use strict';

var _ = require('lodash');
var stripe = require('stripe')(process.env.STRIPE_SECRET);
var Firebase = require('firebase');
var db = new Firebase('https://songswell.firebaseIO.com/');

exports.index = function(req, res) {
  // use free trial until 1st of next month, so everyone's charged the same day
  var now = new Date();
  if (now.getMonth === 12) {
    var current = new Date(now.getFullYear()+1, 1, 1);
  }
  else {
    var current = new Date(now.getFullYear(), now.getMonth()+1, 1);
  }
  try {
    // prep objects for storage
    var address = req.body.address;
    var addr = { name: address.name,
                 street: address.address_line1,
                 apt: address.address_line2,
                 city: address.address_city,
                 state: address.address_state,
                 zip: address.address_zip,
                 country: address.address_country}
    var stripeToken = req.body.stripeToken;
    var ref = (req.body.ref === undefined) ? null : 'cus_' + req.body.ref;
    var planCode = req.body.plan;

    stripe.customers.create({
      card: stripeToken,
      description: req.body.email
    }).then(function(customer) {
      return stripe.customers.createSubscription(
        customer.id,
        {plan: planCode, trial_end: (current.getTime()/1000)},
        function(err, subscription) {
          var content = {name: addr.name, street: addr.street, apt: addr.apt, city: addr.city, state: addr.state, zip: addr.zip, country: addr.country, ref: (' https://rcrdbox.com/?r=' + customer.id.substr(4)), plan: planCode};
          //mandrillMail('rcrd-subscribed', content, {email: req.body.email, name: addr.name});
          //db.child('users').child(customer.id).setWithPriority({token: customer.id, ref: ref, email: req.body.email, address: addr, plan: planCode}, req.body.email);
          res.json([{code: 200, message: 'success', token: {id: customer.id.substr(4), email: req.body.email, address: addr, plan: planCode}}]);
        }
      );
    }, function(err) {
      switch (err.type) {
        case 'StripeCardError':
          // A declined card error
          res.json([{code: 402, message: err.message, token: null}]);
          err.message; // => e.g. "Your card's expiration year is invalid."
          break;
        case 'StripeInvalidRequestError':
          res.json([{code: 500, message: 'Something went wrong with our request to Stripe.', token: null}]);
          // Invalid parameters were supplied to Stripe's API
          break;
        case 'StripeAPIError':
          res.json([{code: 500, message: 'Seems like Stripe\'s having some difficulties.', token: null}]);
          // An error occurred internally with Stripe's API
          break;
        case 'StripeConnectionError':
          res.json([{code: 500, message: 'The connection\'s security seemed to get messed up.', token: null}]);
          // Some kind of error occurred during the HTTPS communication
          break;
        case 'StripeAuthenticationError':
          res.json([{code: 500, message: 'Something went wrong with our request to Stripe.', token: null}]);
          // You probably used an incorrect API key
          break;
      }
    });
  }
  catch (e) {
    res.json([{code: 400, message: 'missing parameter', token: null}]);
  }
};