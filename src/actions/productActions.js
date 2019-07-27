
import axios from 'axios';
import { BASKET_INIT, BASKET_ADD, BASKET_REMOVE } from '../constants/constants';
export const initLocalProducts = () => async dispatch => {
	let localProducts = sessionStorage.getItem('basketProducts');
	if (localProducts) {
		localProducts = JSON.parse(localProducts);
	} else {
		localProducts = [];
	}

	return dispatch({ type: BASKET_INIT, payload: localProducts })
};

export const addToBasket = product => async (dispatch, getState) => {
	const products = [...getState().products];
	products.push(product);

	let localProducts = sessionStorage.getItem('basketProducts');

	localProducts = localProducts ? JSON.parse(localProducts) : [];
	localProducts.push(product);
	sessionStorage.setItem('basketProducts', JSON.stringify(localProducts));

	dispatch({ type: BASKET_ADD, payload: products });
};

export const removeFromBasket = product => async (dispatch, getState) => {
	let products = [...getState().products];
	products = products.filter(p => p.pid !== product.pid);

	let localProducts = sessionStorage.getItem('basketProducts') ? sessionStorage.getItem('basketProducts') : null;

	if (localProducts) {
		localProducts = localProducts.filter(p => p.pid !== product.pid);
		sessionStorage.setItem('basketProducts', JSON.stringify(localProducts));
	}

	dispatch({ type: BASKET_REMOVE, payload: products });
};