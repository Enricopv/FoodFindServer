import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

import { Provider } from 'react-redux';
import ConfigureStore from './components/store/ConfigureStore';
const store = ConfigureStore(); // You can also pass in an initialState here

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
