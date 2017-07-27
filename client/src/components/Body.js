import React, { Component } from 'react';
import './Body.css';

class Body extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cartid: ""
    }
  }



  render() {
    return (
      <div className="Body">
        <p className="Body-intro">
          To get started, edit <code>src/Body.js</code> and save to reload.
        </p>
        <div id="cart"></div>
        <div id="checkout"></div>
      </div>
    );
  }
}

  

export default Body;
