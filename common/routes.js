const React = require("react");
const { Route } = require("react-router");
const App = require("../src/components/App");
const Checkout = require('../src/components/checkout');
const Home = require('../src/components/home');
const Header = require('../src/components/partials/header');
const StripeConnect = require('../src/components/stripeConnect');

const Routes = props => {
  return (
    <div>
      <Header />
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/connect" component={StripeConnect} />
      </App>
    </div>
  );
};

module.exports = Routes;
