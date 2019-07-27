const express = require('express');
const axios = require('axios');
const Router = express.Router();

const { http_build_query } = require('../helpers');
const { keys } = require('../../common/config');

Router.post('/create-intent', (req, res) => {
  const paymentMethodId = req.body.paymentMethodId;

  if (!paymentMethodId) {
    res.status(404).json({
      message: 'Payment intent is missing'
    });
  }

  // TODO: Stripe access origin problem for localhost. Try with https..

  const settings = {
    paymentMethod: paymentMethodId,
    amount: 2000,
    currency: 'USD',
    capture_method: 'manual',
    confirm: false,
    payment_method_types: 'card',
  }

  axios({
    method: 'POST',
    url: `https://api.stripe.com/v1/payment_intents`,
    data: http_build_query(settings),
    headers: {
      Authorization: `Basic ${keys.stripe.secret_key}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(resp => {
    console.log(resp);
  }).catch(err => {
    res.status(500).json({
      response: err
    });
  });
});

module.exports = Router;