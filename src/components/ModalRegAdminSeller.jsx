import React from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

function ModalRegAdminSeller() {

    const [typeReg, setTypeReg] = React.useState('Vendedor');
    const [regData, setRegData] = React.useState({});
    const form = React.useRef();

    const regHandler = async () => {
        try {
            typeReg !== 'Vendedor' ?
                await clienteAxios.post('api/v1/regadmin', regData)
                :
                await clienteAxios.post('api/v1/regseller', regData)
            Swal.fire({
                title: `${typeReg} Creado exitosamente`,
                icon: 'Success'
            })
            form.current.reset();

        } catch (error) {
            const { response } = error;
            console.log(response);
            Swal.fire({
                title: `No se pudo crear el ${typeReg}`,
                icon: 'error'
            })
        }
    }
    console.log(typeReg);

    const changeHandler = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button type="button" className="btn btn-secondary mb-3 mt-2 mt-md-0 col-12 col-md-2" data-toggle="modal" data-target="#regmodal">
                Dar de Alta
            </button>
            <div className="modal fade" id="regmodal" tabIndex="-1" aria-labelledby="regmodalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="mt-3">
                            <div className="row justify-content-between w-100 mx-0 px-4">
                                <h5>Registro {typeReg}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <ul className="nav nav-pills mb-3 justify-content-center mt-2" id="pills-tab" role="tablist">
                                <li onClick={() => setTypeReg('Vendedor')} className="nav-item mx-1 btn btn-secondary active" role="presentation">
                                    Vendedor
                                </li>
                                <li onClick={() => setTypeReg('Administrador')} className="nav-item mx-1 btn btn-secondary" role="presentation">
                                    Administrador
                                </li>
                            </ul>
                            <hr />
                        </div>
                        <div className="modal-body">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <form ref={form}>
                                        <div className="form-group row mt-2">
                                            <div className="col">
                                                <label htmlFor="nombre">Nombre *</label>
                                                <input type="text" id="nombre" onChange={changeHandler} className="form-control" placeholder="Nombre Completo" name="fullname" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="dni">DNI *</label>
                                                <input type="text" id="dni" onChange={changeHandler} className="form-control" placeholder="DNI" name="dni" />
                                            </div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="email">Email *</label>
                                            <input type="email" id="email" onChange={changeHandler} className="form-control" placeholder="ejemplo@ejemplo.com" name="email" />
                                        </div>
                                        <div className="form-gruop row mt-2">
                                            <div className="col">
                                                <label htmlFor="cel">N° Celular *</label>
                                                <input type="phone" id="cel" onChange={changeHandler} className="form-control" placeholder="Número de Teléfono" name="celphone" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="address">Domicilio *</label>
                                                <input type="text" id="address" onChange={changeHandler} className="form-control" placeholder="Domicilio" name="address" />
                                            </div>
                                        </div>
                                        <div className="form-group row mt-2">
                                            <div className="col">
                                                <label htmlFor="user">Usuario *</label>
                                                <input type="text" id="user" onChange={changeHandler} className="form-control" placeholder="Nombre de Usuario" name="user" />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="password">Contraseña *</label>
                                                <input type="password" id="password" onChange={changeHandler} className="form-control" placeholder="Contraseña" name="password" />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" onClick={regHandler} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalRegAdminSeller;