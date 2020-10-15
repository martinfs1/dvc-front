import React from 'react';
import Swal from 'sweetalert2';
import './../css/Login.css'

const Login = () => {
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

      <form className=' p-4 form'>
        <p className='text-center mt-3'>Este contenido está protegido. Para ingresar, por favor, introduce tu usuario y contraseña a continuación:</p>
        <div className="form-group row justify-content-center">
          <div className="col-sm-6">
            <input type="text"
              className="form-control"
              name='username'
              maxLength='10'
              placeholder="Usuario"
            />
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <div className="col-sm-6">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Contraseña"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary d-block">Ingresar</button>
        </div>
      </form>
    </div>

  );
}

export default Login;

