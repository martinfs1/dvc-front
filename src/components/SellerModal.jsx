import React, { useState, useRef } from 'react'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const SellerModal = ({funcNuevaVenta}) => {

  const [pdf, setPdf] = useState(null)
  const [sellerForm, setSellerForm] = useState('')
  const cerrarModal = useRef();
  const resetForm = useRef();

  const actualizarState = e => {    
    let texto = Number(e.target.value)
    setSellerForm({
      ...sellerForm, [e.target.name]: texto
    })
  }
  const crearNuevaVenta = async (e) => {

    e.preventDefault();
    try {

      const NewSales = await clienteAxios.post('api/v1/regsales', sellerForm)
      console.log('newsales ->', NewSales.data.id)
      const formData = new FormData()
      formData.append('myFile', pdf)
      await clienteAxios.post(`api/v1/regsales/${NewSales.data.id}/sendpdf`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Tu venta se cargo correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      resetForm.current.reset();
      cerrarModal.current.click();
      funcNuevaVenta();

    } catch (error) {
      console.log(error);
    }

  }

  const upload = e => {
    if (e.target.files[0].size <= 20000000) {
      let file = e.target.files[0];
      let reader = new FileReader()
      reader.readAsDataURL(file)
    } else {
      e.target.value = ''
      alert('subir algo min 2 mb')
    }
  }
  const OnlyNumber = (event) => {
    if (event.charCode <= 47) {
      Swal.fire({
        icon: 'error',
        title: 'Solo puede ingresar números'
      });
      return false
    }
    if (event.charCode >= 58) {
      Swal.fire({
        icon: 'error',
        title: 'Solo puede ingresar números',
      });
      return false
    }
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
              <h5 className="modal-title text-center mt-3" id="exampleModalLabel">Nueva Venta</h5>
              <hr />
            </div>
            <div className="modal-body">
              <form onSubmit={crearNuevaVenta} ref={resetForm}>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="inputStateCredito">Linea de Crédito *</label>
                    <select id="inputStateCredito" className="form-control" onChange={actualizarState} name="creditLine">
                      <option >Elegir...</option>
                      <option value="sencillo">Sencillo</option>
                      <option value="rapicredito">Rapicredito</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="inputStateOperacion">Indique tipo de operación *</label>
                    <select id="inputStateOperacion" className="form-control" onChange={actualizarState} name="typeOperation">
                      <option >Elegir...</option>
                      <option value="credito">Crédito</option>
                      <option value="electro">Electro</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6 ">
                    <label htmlFor="inputStateNew">Cliente Nuevo *</label>
                    <select id="inputStateNew" className="form-control" onChange={actualizarState} name="newClient">
                      <option >Elegir...</option>
                      <option value="SI">Si</option>
                      <option value="NO">No</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-6 ">
                    <label htmlFor="inputStateTypeClient">Tipo de Cliente *</label>
                    <select id="inputStateTypeClient" className="form-control" onChange={actualizarState} name="TypeClient">
                      <option >Elegir...</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="nombreCliente">Nombre del Cliente *</label>
                    <input className="form-control"
                      id="nombreCliente"
                      name="nameClient"
                      type="text"
                      onChange={actualizarState}
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="dniCLiente">DNI del Cliente *</label>
                    <input className="form-control"
                      id="dniCLiente"
                      name="dniClient"
                      maxLength="8"
                      type="text"
                      onKeyPress={OnlyNumber}
                      onChange={actualizarState}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="celularCLiente">Celular del Cliente *</label>
                    <input className="form-control"
                      id="celularCLiente"
                      name="celphoneClient"
                      type="text"
                      onKeyPress={OnlyNumber}
                      onChange={actualizarState}
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="montoAprobado">Monto Aprobado *</label>
                    <input className="form-control"
                      id="montoAprobado"
                      name="amountApproved"
                      type="number"
                      onKeyPress={OnlyNumber}
                      onChange={actualizarState}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="inputStateCantidadCuotas">Cantidad de Cuotas *</label>
                    <select id="inputStateCantidadCuotas" className="form-control" onChange={actualizarState} name="quotaAmount">
                      <option value={0}>Elegir...</option>
                      <option value={1}>0</option>
                      <option value={3}>3</option>
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                      <option value={15}>15</option>
                      <option value={18}>18</option>
                      <option value={24}>24</option>
                      <option value={30}>30</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="montoPorCuota">Monto por cuota *</label>
                    <input className="form-control"
                      id="montoPorCuota"
                      name="feeAmount"
                      type="text"
                      onKeyPress={OnlyNumber}
                      onChange={actualizarState}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">Detalles de la operación</label>
                  <textarea className="form-control"
                    id="message-text"
                    name="saleDetail"
                    onChange={actualizarState}
                  >
                  </textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlFile1">Seleccionar Archivo PDF</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name='myFile'
                    onChange={e => {
                      setPdf(e.target.files[0])
                      let file = e.target.files
                      if (file.length === 1) {
                        upload(e)
                      } else {
                        e.target.value = ''
                        alert('cargar pdf')
                      }
                    }}
                  />
                </div>
                <p>(*) Campo Obligatorio</p>
                <div className="modal-footer">
                  <button className="btn btn-secondary"
                    data-dismiss="modal"
                    type="button"
                    ref={cerrarModal}
                  >Cerrar
              </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerModal;