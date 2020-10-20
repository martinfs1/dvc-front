import React, { useState } from 'react'
import clienteAxios from '../config/axios';

const SellerModal = () => {

  const [sellerForm, setSellerForm] = useState({
    sellerName: "",
    creditLine: "",
    typeOperation: "",
    newClient: false,
    nameClient: "",
    dniClient: "",
    celphoneClient: "",
    amountApproved: "",
    quotaAmount: "",
    feeAmount: "",
    saleDetail: "",
    myFiles: ""
  })

  const actualizarState = e => {
    setSellerForm({
      ...sellerForm,
      [e.target.name]: e.target.value
    })
  }
  const crearNuevaVenta = e => {
    e.preventDefault();

    clienteAxios.post('api/v1/seller/formseller', sellerForm)
      .then(res => {
        console.log(res);
      })

  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo">
        Nueva Venta
      </button>

      <div className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="">
              <h5 className="modal-title text-center" id="exampleModalLabel">Nueva Venta</h5>
            </div>
            {/* <div className="form-group col-sm-6">
              <label for="inputEmail4">Nombre del vendedor *</label>
              <input className="form-control"
                name="sellerName"
                type="text"
                onChange={actualizarState}
              />
            </div> */}
            <div className="modal-body">
              <form>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label for="inputState">Linea de Crédito *</label>
                    <select id="inputState" className="form-control" onChange={actualizarState} name="creditLine">
                      <option >elegir...</option>
                      <option value="sencillo">Sencillo</option>
                      <option value="rapicredito">Rapicredito</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="inputState">Indique tipo de operación *</label>
                    <select id="inputState" className="form-control" onChange={actualizarState} name="typeOperation">
                      <option >elegir...</option>
                      <option value="credito">Crédito</option>
                      <option value="electro">Electro</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label for="inputEmail4">Nombre del Cliente *</label>
                    <input className="form-control"
                      name="nameClient"
                      type="text"
                      onChange={actualizarState}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="inputPassword4">DNI del Cliente *</label>
                    <input className="form-control"
                      name="dniClient"
                      type="number"
                      onChange={actualizarState}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label for="inputAddress">Celular del Cliente *</label>
                    <input className="form-control"
                      name="celphoneClient"
                      type="number"
                      onChange={actualizarState}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="inputAddress2">Monto Aprobado *</label>
                    <input className="form-control"
                      name="amountApproved"
                      type="number"
                      onChange={actualizarState}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label for="inputState">Cantidad de Cuotas *</label>
                    <select id="inputState" className="form-control" onChange={actualizarState} name="feeAmount">
                      <option value={0}>elegir...</option>
                      <option value={1}>0</option>
                      <option value={3}>3</option>
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                      <option value={15}>15</option>
                      <option value={18}>18</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="inputZip">Monto por cuota *</label>
                    <input className="form-control"
                      name="quotaAmount"
                      type="number"
                      onChange={actualizarState}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">Detalles de la operación</label>
                  <textarea className="form-control"
                    id="message-text"
                    name="saleDetail"
                    onChange={actualizarState}
                  >
                  </textarea>
                </div>
                <div className="form-group">
                  <label for="exampleFormControlFile1">Seleccionar Archivo PDF</label>
                  <input className="form-control-file"
                    id="exampleFormControlFile1"
                    type="file"
                    name="myFiles"
                    onChange={actualizarState}
                  />

                </div>
                <p>(*) Campo Obligatorio</p>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary"
                data-dismiss="modal"
                type="button"
              >Cerrar
              </button>
              <button type="submit" onClick={crearNuevaVenta} className="btn btn-primary">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerModal;