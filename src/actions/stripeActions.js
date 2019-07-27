
import axios from 'axios';
import { STRIPE_CONNECT } from '../constants/constants';
import { keys } from '../../common/config';

export const connectToStripe = (authCode) => async (dispatch, getState) => {
	const res = await axios.post('https://connect.stripe.com/oauth/authorize', {
		client_id: keys.stripe.client_id,
		code: authCode,
		grant_type: "authorization_code"
	});

	console.log(res);
	// TODO :: HTTPS CORS PROBLEM. Solve it then dispatch it.
};

export const createPaymentIntent = (paymentMethodId) => async (dispatch, getState) => {
	const res = await axios.post('/api/create-intent', { paymentMethodId });
	console.log("Response::", res);
};

export const connectToStripeWithKeys = ({ pubKey, secKey }) => async (dispatch, getState) => {
	localStorage.setItem('pubKey', pubKey);
	localStorage.setItem('secKey', secKey);
	return dispatch({ type: STRIPE_CONNECT, payload: { pubKey, secKey } });
};