import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import auth from '../src/utils/auth';
import clienteAxios from './config/axios';
import Sweet from 'sweetalert2';
import { BrowserRouter } from 'react-router-dom';

clienteAxios.interceptors.request.use(config => {
  if (auth.isAuthenticated()) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  }
  return config;
});

clienteAxios.interceptors.response.use(
  response => {
    console.log('Interceptor ejecutado');
    return response;
  }, error => {
    const { response } = error;
    console.log('Interceptor del error');
    if (response.status === 401 && response.data.error && response.data.error.includes("expired")) {
      auth.logOut();
      window.location = '/';
      Sweet.fire({
        title: 'Uuups',
        text: 'Tu sesión expiró, por favor vuelve a ingresar'
      })
    }
    return Promise.reject(error);
  }
);

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>, rootElement);
} else {
  ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>, rootElement);
}

