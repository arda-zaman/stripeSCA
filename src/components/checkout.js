import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StripeProvider } from 'react-stripe-elements';
import { connectToStripeWithKeys } from '../actions/stripeActions';
import { keys } from '../../common/config';
import StripeStore from './stripe/stripeCheckout';
import Stepper from './partials/stepper';
import { paymentFields } from '../constants/constants';

class Checkout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStep: 0,
			customerDetails: {}
		};
	}

	componentWillMount() {

	}

	connectToStripe = () => {
		// const clientId = "ca_FJ1cStQBSTjiiGmnxUArLcrS9V89046f"; ** FOR LIVE
		const clientId = keys.stripe.client_id;
		const scope = "read_write"
		const redirectUrl = keys.stripe.redirect_url;
		const url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUrl}`;

		window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800');
	};

	connectToStripeWithKey = (e) => {
		e.preventDefault();

		const { pubKey, secKey } = this.refs;
		const { onConnectToStripeWithKeys } = this.props;

		if (pubKey.value.length !== 0 || secKey.value.length !== 0) {
			onConnectToStripeWithKeys({ pubKey: pubKey.value, secKey: secKey.value });
		}
	};

	stepHandler = (process) => {
		let { activeStep } = this.state;

		if (process === 'decrease') {
			activeStep--;
		} else if (process === 'increase') {
			activeStep++;
		}

		this.setState({
			activeStep
		});
	};

	fillTheBlanks = () => {
		const inputs = [...document.querySelectorAll('input, textarea')];
		const { customerDetails } = this.state;

		inputs.map(input => {
			const fieldType = input.getAttribute('fieldType');

			if (fieldType === 'address') {
				const addressType = input.getAttribute('addressType');
				const subType = input.getAttribute('fieldSubType');
				const address = customerDetails[addressType] ? customerDetails[addressType] : {};
				address[subType] = paymentFields[addressType][subType];
				customerDetails[addressType] = address;
			} else if (fieldType) {
				customerDetails[fieldType] = paymentFields[fieldType];
			}
		});

		this.setState({
			customerDetails
		});
	};

	fieldChangeHandler = (input) => {
		const { customerDetails } = this.state;
		const fieldType = input.getAttribute('fieldType');

		if (fieldType === "address") {
			const addressType = input.getAttribute('addressType');
			const subType = input.getAttribute('fieldSubType');
			const address = customerDetails[addressType] ? customerDetails[addressType] : {};
			address[subType] = input.value;
			customerDetails[addressType] = address;
		} else {
			customerDetails[fieldType] = input.value;
		}

		this.setState({
			customerDetails
		});
	};

	renderField = ({ type, id, fieldType, fieldSubType, addressType, value }) => {
		return (
			<input
				type={type}
				id={id}
				fieldType={fieldType}
				fieldSubType={fieldSubType}
				addressType={addressType}
				onChange={e => this.fieldChangeHandler(e.target)}
				value={value}
			/>
		)
	};

	render() {
		const { products, stripe } = this.props;
		const { activeStep, customerDetails: { fullname, email, phone, billing, shipping } } = this.state;
		const pubKey = stripe.pubKey || localStorage.getItem('pubKey');
		const secKey = stripe.secKey || localStorage.getItem('secKey');

		return (
			<div className="checkout-page">
				<div className="container">
					{products && products.length > 0 ? (
						<div className="checkout">
							{stripe && pubKey && secKey ? (
								<div className="checkout-form">

									<div className="progress-bar">
										<button
											type="button"
											className="fillBlankButton"
											onClick={this.fillTheBlanks}
										>
											Fill the Blanks
										</button>

										<Stepper step={activeStep} />
									</div>

									<div className="content">
										<div className={`step customer-informations ${activeStep === 0 ? "active" : ""}`}>
											<div className="step-content">
												<h3>Customer Informations</h3>
												<form>
													<div className="form-group">
														<label htmlFor="customer_name">Full Name</label>
														{this.renderField({
															type: "text",
															id: "customer_name",
															fieldType: "fullname",
															value: fullname ? fullname : ''
														})}
													</div>

													<div className="form-group">
														<label htmlFor="customer_email">Email Address</label>
														{this.renderField({
															type: "email",
															id: "customer_email",
															fieldType: "email",
															value: email ? email : ''
														})}
													</div>

													<div className="form-group">
														<label htmlFor="customer_tel">Phone Number</label>
														{this.renderField({
															type: "tel",
															id: "customer_tel",
															fieldType: "phone",
															value: phone ? phone : ''
														})}
													</div>
												</form>
											</div>
										</div>

										<div className={`step address-area ${activeStep === 1 ? "active" : ""}`}>
											<div className="step-content">
												<div className="billing">
													<h3>Billing Address</h3>
													<div className="form-group w-100">
														<label htmlFor="billing-line-1">Street Address-1</label>
														{this.renderField({
															type: "text",
															id: "billing-line-1",
															fieldType: "address",
															fieldSubType: "line_1",
															addressType: "billing",
															value: billing ? billing.line_1 : ''
														})}
													</div>

													<div className="form-group w-100">
														<label htmlFor="billing-line-2">Street Address-2</label>
														{this.renderField({
															type: "text",
															id: "billing-line-2",
															fieldType: "address",
															fieldSubType: "line_2",
															addressType: "billing",
															value: billing ? billing.line_2 : ''
														})}
													</div>

													<div className="w-50">
														<div className="form-group">
															<label htmlFor="billing-city">City</label>
															{this.renderField({
																type: "text",
																id: "billing-city",
																fieldType: "address",
																fieldSubType: "city",
																addressType: "billing",
																value: billing ? billing.city : ''
															})}
														</div>

														<div className="form-group">
															<label htmlFor="billing-state">State</label>
															{this.renderField({
																type: "text",
																id: "billing-state",
																fieldType: "address",
																fieldSubType: "state",
																addressType: "billing",
																value: billing ? billing.state : ''
															})}
														</div>
													</div>

													<div className="form-group w-100">
														<label htmlFor="billing-postal-code">Postal Code</label>
														{this.renderField({
															type: "text",
															id: "billing-postal-code",
															fieldType: "address",
															fieldSubType: "postal_code",
															addressType: "billing",
															value: billing ? billing.postal_code : ''
														})}
													</div>


													<label className="checkbox" htmlFor="use_same">
														<input type="checkbox" id="use_same" />
														<label htmlFor="use_same" className="box">
															<i className="fas fa-check" />
														</label>
														<label htmlFor="use_same">
															Use the same address
														</label>
													</label>
												</div>
												<div className="shipping">
													<h3>Shipping Address</h3>
													<div className="form-group w-100">
														<label htmlFor="shipping-line-1">Street Address-1</label>
														{this.renderField({
															type: "text",
															id: "shipping-line-1",
															fieldType: "address",
															fieldSubType: "line_1",
															addressType: "shipping",
															value: shipping ? shipping.line_1 : ''
														})}
													</div>

													<div className="form-group w-100">
														<label htmlFor="shipping-line-2">Street Address-2</label>
														{this.renderField({
															type: "text",
															id: "shipping-line-2",
															fieldType: "address",
															fieldSubType: "line_2",
															addressType: "shipping",
															value: shipping ? shipping.line_2 : ''
														})}
													</div>

													<div className="w-50">
														<div className="form-group">
															<label htmlFor="shipping-city">City</label>

															{this.renderField({
																type: "text",
																id: "shipping-city",
																fieldType: "address",
																fieldSubType: "city",
																addressType: "shipping",
																value: shipping ? shipping.city : ''
															})}
														</div>

														<div className="form-group">
															<label htmlFor="shipping-state">State</label>
															{this.renderField({
																type: "text",
																id: "shipping-state",
																fieldType: "address",
																fieldSubType: "state",
																addressType: "shipping",
																value: shipping ? shipping.state : ''
															})}
														</div>
													</div>

													<div className="form-group w-100">
														<label htmlFor="shipping-postal-code">Postal Code</label>
														{this.renderField({
															type: "text",
															id: "shipping-postal-code",
															fieldType: "address",
															fieldSubType: "postal_code",
															addressType: "shipping",
															value: shipping ? shipping.postal_code : ''
														})}
													</div>
												</div>
											</div>
										</div>

										<div className={`step stripe-area ${activeStep === 2 ? "active" : ""}`}>
											<StripeProvider apiKey={localStorage.getItem('pubKey')}>
												<StripeStore />
											</StripeProvider>
										</div>

										<div className="actions">
											<button
												type="button"
												disabled={activeStep === 0 && true}
												onClick={this.stepHandler.bind(this, 'decrease')}
											>
												Previous
											</button>

											{activeStep < 2 && (
												<button
													type="button"
													onClick={this.stepHandler.bind(this, 'increase')}
												>
													Continue
												</button>
											)}
										</div>
									</div>
								</div>
							) : (
									<div className="stripe-connect">
										<div className="button-area">
											<h3>Stripe Connection</h3>
											<p>Before the pay, you have to connect to Stripe. You can connect with button or enter the Publishable and Secret key that belongs to your account</p>
											<button className="stripe-connect-button" onClick={this.connectToStripe}>
												Connect to Stripe
										</button>
										</div>

										<form className="text-area" onSubmit={this.connectToStripeWithKey}>
											<div className="form-group">
												<label htmlFor="pubKey">Publishable Key</label>
												<input type="text" id="pubKey" ref="pubKey" defaultValue={pubKey} />
											</div>

											<div className="form-group">
												<label htmlFor="secKey">Secret Key</label>
												<input type="text" id="secKey" ref="secKey" defaultValue={secKey} />
											</div>

											<div className="button">
												<button type="submit">
													Connect with Keys
												</button>
											</div>
										</form>
									</div>
								)}
						</div>
					) : (
							<div>
								Please, add product to basket at first.
						</div>
						)}
				</div>
			</div>
		)
	}
}

Checkout.propTypes = {
	products: PropTypes.array,
	stripe: PropTypes.object
};

Checkout.defaultProps = {
	products: [],
	stripe: {}
};

const mapStateToProps = ({ products, stripe }) => {
	return {
		products,
		stripe
	};
};

const mapDispatchToProps = {
	onConnectToStripeWithKeys: connectToStripeWithKeys
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);