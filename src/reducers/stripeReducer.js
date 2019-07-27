
import { STRIPE_CONNECT, STRIPE_CREDENTIALS_ADD, STRIPE_CREDENTIALS_REMOVE } from '../constants/constants';


export default (state = {}, action) => {
	switch (action.type) {
		case STRIPE_CONNECT:
		case STRIPE_CREDENTIALS_ADD:
		case STRIPE_CREDENTIALS_REMOVE:
			return action.payload || false;
		default:
			return state;
	}
}
