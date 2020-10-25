import React from 'react'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const AdminSaleModal = (props) => {

    const { datos } = props;

    const [dataName, setDataName] = React.useState([]);
    const [options, setOptions] = React.useState([]);

    const [sellerForm, setSellerForm] = React.useState({
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
        try {
            clienteAxios.post('api/v1/seller/formseller', sellerForm)
        } catch (error) {
            const { response } = error
            console.log(error);
        }
    }

    const optionsNameSellers = () => {
        let opciones = dataName.map(o => <option value={o.fullname}>{o.fullname}</option>)
        setOptions(opciones)
    }
    
    
    React.useEffect(() => {
        setDataName(datos);
    }, [datos]);

    React.useEffect(() => {
        optionsNameSellers()
    }, [dataName])

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
            <div className="modal fade" id="admin-Sale" tabIndex="-1" aria-labelledby="admin-Sale" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="">
                            <h5 className="modal-title text-center mt-3" id="admin-Sale">Nueva Venta</h5>
                            <hr/>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label for="linea">Linea de Crédito *</label>
                                        <select id="linea" className="form-control" onChange={actualizarState} name="creditLine">
                                            <option selected disabled>Elegir...</option>
                                            <option value="sencillo">Sencillo</option>
                                            <option value="rapicredito">Rapicredito</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label for="operacion">Indique tipo de operación *</label>
                                        <select id="operacion" className="form-control" onChange={actualizarState} name="typeOperation">
                                            <option selected disabled>Elegir...</option>
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
                                            onKeyDown={OnlyNumber}
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
                                            onKeyDown={OnlyNumber}
                                            onChange={actualizarState}
                                        />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label for="inputAddress2">Monto Aprobado *</label>
                                        <input className="form-control"
                                            name="amountApproved"
                                            type="number"
                                            onKeyDown={OnlyNumber}
                                            onChange={actualizarState}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label for="inputState">Cantidad de Cuotas *</label>
                                        <select id="inputState" className="form-control" onChange={actualizarState} name="feeAmount">
                                            <option selected disabled>Elegir...</option>
                                            <option value={1}>0</option>
                                            <option value={3}>3</option>
                                            <option value={6}>6</option>
                                            <option value={12}>12</option>
                                            <option value={15}>15</option>
                                            <option value={18}>18</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label for="cuota">Monto por cuota *</label>
                                        <input className="form-control"
                                            id="cuota"
                                            name="quotaAmount"
                                            type="number"
                                            onKeyDown={OnlyNumber}
                                            onChange={actualizarState}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label for="message-text" className="col-form-label">Detalles de la operación</label>
                                        <textarea className="form-control"
                                            id="message-text"
                                            name="saleDetail"
                                            rows="1"
                                            onChange={actualizarState}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label for="vendedor" className="col-form-label">Vendedor *</label>
                                        <select id="vendedor" className="form-control" onChange={actualizarState} name="sellerName">
                                            <option selected disabled>Elegir...</option>
                                            {options}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="file">Seleccionar Archivo PDF</label>
                                    <input className="form-control-file"
                                        id="file"
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

export default AdminSaleModal;