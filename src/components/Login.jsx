import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import './../css/Login.css'
import auth from '../utils/auth';

const Login = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const logUser = e => {
    e.preventDefault();

    clienteAxios.post('/api/v1/login/', { user, password })
      .then(response => {
        auth.logedIn(response.data.token, response.data.fullname);
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Logueado correctamente",
          showConfirmButton: false,
          timer: 1000
        });

        response.data.role === 'admin' ?
          history.push('/panel')
          :
          history.push('/seller')
      }).catch(function (error) {
        const { response } = error
        console.log(response);
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          showConfirmButton: false,
          timer: 1000
        });
      })
  }

  return (
    <div className="">
      <div className="text-center">
        <a href="#">Sistema de Gestión de Ventas</a>
        <p>Del Valle Créditos</p>
      </div>
      <div className="container-fluid p-3">
        <h1 className='tituloLogin text-center display-4'>
          Protegido: Sistema de Ventas</h1>
      </div>

      <form className=' p-4 form' onSubmit={logUser}>
        <p className='text-center mt-3'>Este contenido está protegido. Para ingresar, por favor, introduce tu usuario y contraseña a continuación:</p>
        <div className="form-group row justify-content-center">
          <div className="col-sm-6">
            <input type="text"
              className="form-control"
              type="text"
              name='user'
              maxLength='10'
              placeholder="Usuario"
              minLength="4"
              autoFocus
              onChange={(e) => { setUser(e.target.value) }}
              required
            />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <div className="col-sm-6">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder="Contraseña"
              title="La contraseña debe tener al menos 8 caracteres, una mayuscula y una minúscula"
              onChange={(e) => { setPassword(e.target.value) }}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary d-block">Ingresar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

