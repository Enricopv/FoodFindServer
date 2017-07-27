import React, { Component } from 'react';
import './ProductExample.css';
import Axios from 'axios';
import Product from './Product';

class ProductExample extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Axios.get('/api/getproducts')
      .then(response => {
        this.setState({
          data: response.data
        })
        console.log(this.state.data);
      })
  }

  render() {
    let productList = this.state.data.map(product => 
      <Product
        key={product.id}
        id={product.id}
        color={product.color}
      />
    )
    return (
      <div className="ProductExample">
        Products
        {productList}
      </div>
    );
  }
}


export default (ProductExample);
