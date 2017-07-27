import React, { Component } from 'react';
import './ProductExample.css';
import { connect } from 'react-redux';
import { addProduct } from './actions/cart';

class Product extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
  }

  componentDidMount() {
    var element = document.getElementById(this.props.color);
    element.style.backgroundColor = this.props.color;
  }

  add(productId, color) {
    this.props.addProduct(productId, color);
    console.log('hello')
  }

  render() {
    return(
      <div className="Product" id={this.props.color}>
        <div className="productTitle">
          {this.props.color}
        </div>
        <button onClick={() => this.add(this.props.id, this.props.color)}>Add to Cart</button> 
        <button onClick={this.b}>bbb</button>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     products: state.product
//   };
// };

//In shopping cart, this should be remove
const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (productId, color) => dispatch(addProduct(productId, color))
  };
};

export default connect(null, mapDispatchToProps)(Product);