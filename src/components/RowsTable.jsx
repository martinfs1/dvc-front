import React from 'react';
import Swal from 'sweetalert2';

function RowsTable({ datosShow, onClickHandler, deleteSaleHandler, datosSellerShow, montosTotalesShow, tablasChange, getDatos }) {


    const [obs, setObs] = React.useState('')

    const handlerObs = (props) => {
        setObs(props)
    }

    const alertEdit = (f) => {
        Swal.fire({
            title: "¿Estás seguro de deshabilitar esta venta?",
            showDenyButton: true,
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Proceso Realizado con Exito!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                deleteSaleHandler(f);
                getDatos();
            } else if (result.isDenied) {
                Swal.fire({
                    title: '¡Cambios Descartados!',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }

    return (
        <>
            {
                tablasChange ?
                    datosShow.map(f =>
                        <tr key={f._id} id={f._id}>
                            <td className="py-1 text-nowrap" scope="row">{f.date}</td>
                            <td className="py-1 text-nowrap" colSpan="3">{f.nameClient}</td>
                            <td className="py-1 text-nowrap">{f.dniClient}</td>
                            <td className="py-1 text-nowrap">{f.celphoneClient}</td>
                            <td className="py-1 text-nowrap" colSpan="3">{f.fullname}</td>
                            <td className="py-1 text-nowrap">{f.creditLine}</td>
                            <td className="py-1 text-nowrap">${f.amountApproved}</td>
                            <td className="py-1 text-nowrap text-center">${f.quotaAmount}</td>
                            <td className="py-1 text-nowrap text-center">{f.feeAmount}</td>
                            <td className="py-1 text-nowrap text-center">{f.enable}</td>
                            <td className="py-1 text-nowrap text-center">{f.saleDetail ? <button className="btn btn-primary py-0" onClick={() => handlerObs(f.saleDetail)} data-toggle="modal" data-target="#modalObservacion">Ver</button> : "-"}</td>
                            <td className="py-1 text-nowrap"><a data-toggle="modal" data-target="#exampleModal"><i className="fas fa-edit text-primary mx-1" role="button" tabIndex="0" onClick={() => onClickHandler(f)}></i></a><i role="button" tabIndex="0" className="far fa-trash-alt text-danger mx-1" onClick={() => alertEdit(f)}></i></td>
                        </tr>)
                    :
                    montosTotalesShow.map(f =>
                        <tr key={f._id} id={f._id}>
                            <td className="py-1 text-nowrap">{f.year}</td>
                            <td className="py-1 text-nowrap" colSpan="3" scope="row">{f.seller.fullname}</td>
                            <td className="py-1 text-nowrap">{f.seller.dni}</td>
                            <td className="py-1 text-nowrap">${f.annualAmountApproved}</td>
                            <td className="py-1 text-nowrap">${f.enero}</td>
                            <td className="py-1 text-nowrap">${f.febrero}</td>
                            <td className="py-1 text-nowrap">${f.marzo}</td>
                            <td className="py-1 text-nowrap">${f.abril}</td>
                            <td className="py-1 text-nowrap">${f.mayo}</td>
                            <td className="py-1 text-nowrap">${f.junio}</td>
                            <td className="py-1 text-nowrap">${f.julio}</td>
                            <td className="py-1 text-nowrap">${f.agosto}</td>
                            <td className="py-1 text-nowrap">${f.septiembre}</td>
                            <td className="py-1 text-nowrap">${f.octubre}</td>
                            <td className="py-1 text-nowrap">${f.noviembre}</td>
                            <td className="py-1 text-nowrap">${f.diciembre}</td>
                            <td className="py-1 text-nowrap"><a data-toggle="modal" data-target="#exampleModal"><i className="fas fa-edit text-primary mx-1" role="button" tabIndex="0" onClick={() => onClickHandler(f)}></i></a><i className="far fa-trash-alt text-danger mx-1" role="button" tabIndex="0"></i></td>
                        </tr>
                    )
            }
             <div className="modal fade" id="modalObservacion" tabIndex="-1" aria-labelledby="modalObservacionLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalObservacionLabel">Observación</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {obs}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RowsTable;