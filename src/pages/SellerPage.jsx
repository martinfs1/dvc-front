import React, { useState, useEffect } from 'react'
import SellerModal from '../components/SellerModal'
import './../css/Login.css'
import clienteAxios from '../config/axios';
import { jwtData } from '../App';

const SellerPage = () => {

  const [sales, setSales] = useState([])
  const [saleShow, setSaleShow] = useState([])
  const [sellerName, setSellerName] = useState("")
  const [montoSales, setMontoSales] = useState()

  const getDatos = async (req, res) => {
    try {
      const prueba = await clienteAxios.get('api/v1/allsales');
      // const monto = await clienteAxios.get('/api/v1/montosales');
      setSales(prueba.data);
      setSaleShow(prueba.data);
      // setMontoSales(monto.data)
      console.log('prueba', prueba.data)
    } catch (error) {
      console.log(error)
    }
  }

  let fecha = new Date()

  const ventasMes = () => {
    const actual = fecha.toLocaleString('default', { month: 'long' }) + '/' + fecha.toLocaleString('default', { year: 'numeric' });
    let ventas = sales.filter(m => { return m.month.toLowerCase().includes(actual) });
    setSaleShow(ventas);
  }

  useEffect(() => {
    setSellerName(localStorage.getItem('username'))
    getDatos()

  }, []);

  useEffect(() => {
    ventasMes()
  }, [sales])

  const search = (e) => {

    const dniSearch = sales.filter(sales => {
      return sales.dniClient.toString().includes(e.target.value)

    })
    setSaleShow(dniSearch)
  }

  const ventas = saleShow.map(sale =>
    <div key={sale._id} className="px-0 col-12 col-md-3 mx-1 my-4 card DivContainer justify-content-around saleCard  ">
      <div className="card-header d-flex w-100 justify-content-between flex-wrap mb-4" >
        <h5 className="mb-0">{sale.nameClient}</h5>
        <small className="fecha-alta">
          {sale.date}
        </small>
      </div>
      <div className="card-body contacto py-2">
        <p className="card-text">DNI: {sale.dniClient}</p>
        <p className="card-text">Numero Celular: {sale.celphoneClient}</p>
        <p className="card-text">Tipo de Operación: {sale.typeOperation}</p>
        <p className="card-text">Linea Crédito: {sale.creditLine}</p>
        <p className="card-text">Monto aprobado: {sale.amountApproved}</p>
        <p className="card-text">Cantidad de cuotas: {sale.feeAmount}</p>
        <p className="card-text">Monto de la cuota: {sale.quotaAmount}</p>
        <p className="card-text">Detalles de la Operación: {sale.saleDetail}</p>
      </div>
    </div>
  ).reverse();

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
          <a className="navbar-brand" href="#">{sellerName}</a>
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
                onChange={search}
              />
            </form>
            {/* <div>
              <span className="">Ventas Total del mes: $127.000</span>
            </div> */}
          </div>
        </nav>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <h2 className="my-1 text-center display-4">Ventas del corriente mes: $524.000</h2>
          {ventas}
        </div>
      </div>
    </>
  );
}

export default SellerPage; 