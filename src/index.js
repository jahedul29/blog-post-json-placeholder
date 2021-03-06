import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/style.scss';
import App from './App';

// bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

// Toastify required imports
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <App />,
    <ToastContainer position="bottom-right" autoClose={3000}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
