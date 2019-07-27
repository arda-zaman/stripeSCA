import React from 'react';
import { Elements, injectStripe, CardElement } from 'react-stripe-elements';
import CheckoutForm from './stripeElements';


class StripeStore extends React.Component {
  render() {
    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    );
  }
}

export default StripeStore;