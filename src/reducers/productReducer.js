
import { BASKET_INIT, BASKET_ADD, BASKET_REMOVE } from '../constants/constants';


export default (state = [], action) => {
	switch (action.type) {
		case BASKET_INIT:
		case BASKET_ADD:
		case BASKET_REMOVE:
			return action.payload || false;
		default:
			return state;
	}
}
