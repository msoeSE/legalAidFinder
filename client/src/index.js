import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './semantic/dist/semantic.min.css';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'), // eslint-disable-line no-undef
);
