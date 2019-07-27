import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToBasket, removeFromBasket } from '../actions/productActions';
import PropTypes from 'prop-types';

class Products extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      mainProducts: [
        {
          pid: 1,
          image: require('../assets/images/products/p1.jpg'),
          name: 'Lavender Parfume',
          price: "250.00"
        },
        {
          pid: 2,
          image: require('../assets/images/products/p2.jpg'),
          name: 'Protein Tablets',
          price: "125.00"
        },
        {
          pid: 3,
          image: require('../assets/images/products/p3.jpg'),
          name: 'The Uptown Shoper',
          price: "100.00"
        },
        {
          pid: 4,
          image: require('../assets/images/products/p4.jpg'),
          name: 'Black Camera',
          price: "75.00"
        },
        {
          pid: 5,
          image: require('../assets/images/products/p5.jpg'),
          name: 'The Skin Rejuve Kit',
          price: 189.99
        },
        {
          pid: 6,
          image: require('../assets/images/products/p6.jpg'),
          name: 'Vintage Basketball Shoes',
          price: 119.99
        },
        {
          pid: 7,
          image: require('../assets/images/products/p7.jpg'),
          name: 'Dwell Urchin Sculpture',
          price: "140.00"
        },
        {
          pid: 8,
          image: require('../assets/images/products/p8.jpg'),
          name: 'The Fancy Schmancy Watch',
          price: "110.00"
        }
      ],
      selectedProducts: []
    }
  }

  addBasket = (e) => {
    const pid = e.target.getAttribute('product-id');
    const { mainProducts } = this.state;
    const { onAddToBasket } = this.props;
    const product = mainProducts.find(p => p.pid == pid);

    onAddToBasket(product).then(res => {
      console.log("Added to basket successfully");
    });
  };

  removeBasketItem = (e) => {
    const { onRemoveFromBasket } = this.props;
    const { mainProducts } = this.state;
    const pid = e.target.getAttribute('product-id');
    const product = mainProducts.find(p => p.pid == pid);

    onRemoveFromBasket(product).then(res => {
      console.log("Item removed from basket successfully");
    });

  };

  dropdownHandler = (val) => {
    this.setState({
      dropdownOpen: val
    });
  };

  renderProducts = () => {
    const { mainProducts } = this.state;
    const { products } = this.props;
    const dom = [];
    console.log(products);
    mainProducts.map(product => {
      const isProductSelected = products.find(p => p.pid === product.pid);
      dom.push(
        <div className="product" key={product.pid}>
          <div className="product-content">
            <div className="image">
              <img src={product.image} />
            </div>
            <div className="descriptions">
              <span className="name">{product.name}</span>
              <span className="price">{product.price} <small> USD </small></span>

              {isProductSelected ? (
                <button
                  type="button"
                  className="remove-basket"
                  product-id={product.pid}
                  onClick={this.removeBasketItem}
                >
                  <i className="material-icons add">add</i>
                  <span>Remove the product</span>
                </button>
              ) : (
                  <button
                    type="button"
                    className="add-basket"
                    product-id={product.pid}
                    onClick={this.addBasket}
                  >
                    <i className="material-icons add">add</i>
                    <span>Add to Basket</span>
                  </button>
                )}
            </div>
          </div>
        </div>
      )
    });

    return dom;
  }

  render() {
    const { dropdownOpen } = this.state;
    const { products } = this.props;

    return (
      <div className="products">
        <div
          className={`dropdown-background ${dropdownOpen ? 'active' : ''}`}
          onClick={this.dropdownHandler.bind(this, !dropdownOpen)}
        />
        <div className="title">
          <h2>Products</h2>
          <div className="basket" onClick={this.dropdownHandler.bind(this, !dropdownOpen)}>
            <button type="button" className="basket-button">
              <i className="material-icons">shopping_basket</i>
              <small className="number">{!products ? 0 : products.length}</small>
            </button>
            <div className={`dropdown ${dropdownOpen ? 'active' : ''}`}>
              <ul>
                {products.map(product => (
                  <li key={product.pid} product-id={product.pid}>
                    <img src={product.image} />
                    <span>{product.name}</span>
                    <small>{product.price}$</small>
                  </li>
                ))}
              </ul>

              <Link
                className="go-checkout"
                to="/checkout"
              >
                Make Payment
              </Link>

            </div>
          </div>
        </div>
        <div className="products-container">
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

Products.propTypes = {
  products: PropTypes.array.isRequired
};

Products.defaultProps = {

};

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

const mapDispatchToProps = {
  onAddToBasket: addToBasket,
  onRemoveFromBasket: removeFromBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);