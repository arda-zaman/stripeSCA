// CheckoutForm.js
import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { createPaymentIntent } from '../../actions/stripeActions';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class CheckoutForm extends React.Component {

  handleSubmit = async (ev) => {
    ev.preventDefault();

    const { onCreatePaymentIntent } = this.props;

    this.props.stripe
      .createPaymentMethod('card', { billing_details: { name: 'Jenny Rosen' } })
      .then(({ paymentMethod }) => {
        if (paymentMethod) {
          console.log("PAymentMethod", paymentMethod);
          onCreatePaymentIntent(paymentMethod.id);
        }
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="#">
          Card Details
          <CardElement style={{ base: { fontSize: '16px' } }} />
        </label>
        <button>Confirm order</button>
      </form>
    );
  }
}

const mapStateToProps = ({ stripe }) => {
  return {
    stripe
  }
};

const mapDispatchToProps = {
  onCreatePaymentIntent: createPaymentIntent
};

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));