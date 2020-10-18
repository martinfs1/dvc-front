import React from 'react'
import SellerModal from '../components/SellerModal'
import './../css/Login.css'


const SellerPage = () => {
  return (
    <div>
      <div className="text-center">
        <a href="#">Sistema de Gestión de Ventas</a>
        <p>Del Valle Créditos</p>
      </div>
      <div className="container-fluid p-3">
        <h1 className='tituloLogin text-center display-4'>
          Protegido: Sistema de Ventas
        </h1>
      </div>
      <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">Ventas Semanal</button>
        <button type="button" className="btn btn-secondary">Ventas Mensual </button>
        <button type="button" className="btn btn-secondary">Ventas Anual</button>

        <form className="form-inline">
          <input type="number" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="DNI Cliente" />
          <button type="button" class="btn btn-primary mb-2">Buscar</button>
        </form>
        <SellerModal />

      </div>
    </div>
  );
}

export default SellerPage; 