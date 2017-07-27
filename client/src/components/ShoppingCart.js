import React, { Component } from 'react';
import './ShoppingCart.css';
import { connect } from 'react-redux';
import { addProduct } from './actions/cart';

class ShoppingCart extends Component {
 
  componentDidUpdate() {
    console.log(this.props.products)
  }

  render() {
    var i = 0;
    let cartProducts = this.props.products.map(cartProduct =>
      <CartProduct
        key={i++}
        id={cartProduct.id}
        color={cartProduct.color}
      />
    )
    return (
      <div className="ShoppingCart">     
        Shopping Cart 
        {cartProducts}
        <div className="Site-page">
           {this.props.children} 
        </div>
      </div>
    );
  }
}

class CartProduct extends Component {
  componentDidMount() {
    var element = document.getElementById(this.props.color);
    element.style.backgroundColor = this.props.color;
    
  }
  render() {
    return(
      <div className="CartProduct" >
        <div className={"color " + this.props.color} id={this.props.color + this.props.key}>
          {this.props.color}
        </div>
        <button className="remove">Remove</button>
        <div/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        products: state.cart
    };
};

// In shopping cart, this should be remove
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (productId, color) => dispatch(addProduct(productId, color))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
