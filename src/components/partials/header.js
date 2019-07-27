import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <h1>
            Stripe PSD2 Intent Api - Node App
          </h1>
          <small>Made by <a href="#">Arda Zaman</a></small>
        </div>
      </header>
    )
  }
}

export default Header;