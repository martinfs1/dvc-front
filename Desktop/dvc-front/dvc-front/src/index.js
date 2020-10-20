import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import clienteAxios from '../src/config/axios';
import auth from "./utils/auth"
import Sweet from 'sweetalert2';

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
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
