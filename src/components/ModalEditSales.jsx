import React from 'react';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


export default function RegSeller(props) {

    const { datos, onChangeHandler, tablasChange } = props;

    const btnCerrar = React.useRef(null);

    const alertEdit = async (req, res) => {
        Swal.fire({
            title: "¿Está seguro de realizar los Cambios?",
            showDenyButton: true,
            confirmButtonText: `Guardar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Guardado!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                editVentasHandler();
                btnCerrar.current.click();
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cambios Descartados!',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }

    const editVentasHandler = async (req, res) => {
        try {
            await clienteAxios.put(`api/v1/salesupdate/${datos._id}`, datos)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Editar Venta</h5>
                            <button type="button" ref={btnCerrar} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="row justify-content-center">
                                {
                                    tablasChange ?
                                        <>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="nombre">Nombre</label>
                                                    <input type="text" id="nombre" className="form-control text-center" placeholder="Nombre Completo" name="nameClient" onChange={onChangeHandler} value={datos.nameClient} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="number">Número</label>
                                                    <input type="text" id="number" className="form-control text-center" placeholder="Número de Teléfono" name="celphoneClient" onChange={onChangeHandler} value={datos.celphoneClient} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="dia">Día</label>
                                                    <input type="text" id="dia" className="form-control text-center" placeholder="Día" name="date" onChange={onChangeHandler} value={datos.date} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="cuotas">Cuotas</label>
                                                    <input type="text" id="cuotas" className="form-control text-center" placeholder="Número de Cuotas" name="feeAmount" onChange={onChangeHandler} value={datos.feeAmount} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col text-center">
                                                    <label htmlFor="monto">Monto Crédito</label>
                                                    <input type="text" id="monto" className="form-control text-center" placeholder="Número de Teléfono" name="amountApproved" onChange={onChangeHandler} value={datos.amountApproved} />
                                                </div>
                                                <div className="col text-center">
                                                    <label htmlFor="mcuotas">Monto Cuotas</label>
                                                    <input type="text" id="mcuotas" className="form-control text-center" placeholder="Monto de Cuotas" name="quotaAmount" onChange={onChangeHandler} value={datos.quotaAmount} />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            Edit Vendedor
                                        </>
                                }
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal"></button> */}
                            <button type="button" className="btn btn-primary" onClick={alertEdit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};