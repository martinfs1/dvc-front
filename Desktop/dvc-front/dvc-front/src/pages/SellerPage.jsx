import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import SellerModal from '../components/SellerModal'
import './../css/Login.css'
import clienteAxios from '../config/axios';

const SellerPage = () => {


  const [sales, setSales] = useState([])
  // const [amountApproved, celphoneClient, creditLine, date, dniClient, enable, sellerName] = sale;
  console.log(sales)

  // useEffect(() => {
  //   const consultarApi = async () => {
  //     await clienteAxios.get('api/v1/seller/allsales')
  //       .then(res => {
  //         console.log(res.data)
  //         setSales(res.data);
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  //   consultarApi();
  // }, []);

  const getDatos = async (req, res) => {
    try {
      const prueba = await clienteAxios.get('api/v1/seller/allsales');
      setSales(prueba.data);
    } catch (error) {
      const { response } = error
    }
  }

  useEffect(() => {
    getDatos()
  }, []);

  // const sellers = sales.map(s => console.log(s));

  const ventas = sales.map(sale =>
    <Link className="p-3 list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between mb-4" >
        <h4 className="mb-2 ">{sale.nameClient}</h4>
        <small className="fecha-alta">
          {sale.date}
        </small>
      </div>
      <div className="contacto py-3">
        <p>DNI: {sale.dniClient}</p>
        <p>Numero Celular: {sale.celphoneClient}</p>
        <p>Tipo de Operación: {sale.typeOperation}</p>
        <p>Linea Crédito: {sale.creditLine}</p>
      </div>
    </Link>
  );

  return (
    <>
      <div className="text-center">
        <a href="#">Sistema de Gestión de Ventas</a>
        <p>Del Valle Créditos</p>
      </div>
      <div className="container-fluid p-3">
        <h1 className='tituloLogin text-center display-4'>
          Protegido: Sistema de Ventas
        </h1>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <a className="navbar-brand" href="#">Nombre del Vendedor</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <SellerModal />
              </li>
            </ul>
            <form className="form-inline my-2 my-sm-0">
              <input className="form-control mr-sm-2"
                type="search"
                placeholder="DNI Cliente"
                aria-label="Search"
                maxLength='8'
              />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
            </form>
          </div>
        </nav>
      </div>

      <h2 className="my-3 text-center display-4">Ventas</h2>
      <div className="container mt-2 py-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="list-group">
              {ventas}
              {/* {sales.map(sale => (
                <Link key={sale.index} className="p-3 list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between mb-4" >
                    <h4 className="mb-2 ">{sale.nameClient}</h4>
                    <small className="fecha-alta">
                      {sale.date}
                    </small>
                  </div>
                  <div className="contacto py-3">
                    <p>DNI: {sale.dniClient}</p>
                    <p>Numero Celular: {sale.celphoneClient}</p>
                    <p>Tipo de Operación: {sale.typeOperation}</p>
                    <p>Linea Crédito: {sale.creditLine}</p>
                  </div>
                </Link>
              ))} */}
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default SellerPage; 