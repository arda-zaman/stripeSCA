import React from 'react';
import { connect } from 'react-redux';
import { connectToStripe } from '../actions/stripeActions';

class StripeConnect extends React.Component {
	componentWillMount() {
		const authCode = this.getUrlParam('code', this.props.location.search);
		const { onConnecToStripe } = this.props;
		
		onConnecToStripe(authCode);

		setTimeout(() => {
			// window.close();
		}, 1000);
	}

	getUrlParam = (name, location) => {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	render() {
		return (
			<div>
				Loading..
			</div>
		)
	}
}

const mapStateToProps = ({ stripe }) => {
	return {
		stripe
	}
}

const mapDispatchToProps = {
	onConnecToStripe: connectToStripe
}

export default connect(mapStateToProps, mapDispatchToProps)(StripeConnect);