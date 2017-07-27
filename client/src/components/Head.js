import React, { Component } from 'react';
import logo from './logo.svg';
import './Head.css';
import {Link} from 'react-router';

class Head extends Component {
  render() {
    return (
      <div className="Head">
        <div className="Head-header">
          <img src={logo} className="Head-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <div>
            <Link to="/" className="link">Home</Link>
            <Link to="/display" className="link">Alternate Component</Link>
            <Link to="/apidemo" className="link">Api Example</Link>
            <Link to="/productexample" className="link">Shopping Cart</Link>
          </div>
        </div>
        <div className="Site-page">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Head;
