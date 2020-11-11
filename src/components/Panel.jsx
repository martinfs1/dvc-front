import React, { Suspense } from 'react';
import '../css/Panel.css';
import ModalEditSales from './ModalEditSales';
import clienteAxios from '../config/axios';
import AdminSaleModal from './AdminSaleModal';
import ModalRegAdminSeller from './ModalRegAdminSeller';
import Pagination from './Pagination';

// import RowsTable from './RowsTable';

const RowsTable = React.lazy(() => import('./RowsTable'));

export default function Panel() {

    const [tablasChange, setTablasChange] = React.useState(true);


    // Tabla 
    const [sellerDatos, setSellerDatos] = React.useState([]);
    const [datosSellerShow, setdatosSellerShow] = React.useState([]);

    // Tabla Ventas
    const [datosShow, setdatosShow] = React.useState([]);
    const [userDatos, setUserDatos] = React.useState([]);
    const [fila, setFila] = React.useState({});

    // Paginacion 
    const [limit, setLimit] = React.useState(20);
    const [page, setPage] = React.useState(1);
    const [datosRows, setDatosRows] = React.useState([]);
    const [params, setParams] = React.useState({})


    const getDatos = async () => {
        try {
            const sellers = await clienteAxios.get(`api/v1/allseller`);
            const clientes = await clienteAxios.get(`api/v1/allsales`, {
                params: {
                    page: page,
                    limit: limit,
                    ...params
                }
            })
            
            // TablesSales
            setSellerDatos(sellers.data.docs);
            setdatosSellerShow(sellers.data.docs);

            //TablesSales    
            setdatosShow(clientes.data.docs);
            setUserDatos(clientes.data.docs);
            setDatosRows(clientes.data);
            
        } catch (error) {
            const { response } = error;
            console.log(response);
        }
    }

    // Sort's Table Sales

    const sortAmount = () => {
        let sortDatosAmount = [...userDatos].sort((a, b) => (b.amountApproved - a.amountApproved))
        if (sortDatosAmount[0] === datosShow[0])
            sortDatosAmount = [...userDatos].sort((b, a) => (b.amountApproved - a.amountApproved))
        setdatosShow(sortDatosAmount)
    }

    const sortDNI = () => {
        let sortdatos = [...userDatos].sort((a, b) => (b.dniClient - a.dniClient))
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort((b, a) => (b.dniClient - a.dniClient))
        setdatosShow(sortdatos);
    }

    const sortNombre = () => {
        let sortdatos = [...userDatos].sort((a, b) => (a.nameClient > b.nameClient ? 1 : a.nameClient < b.nameClient ? -1 : 0))
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort((b, a) => (a.nameClient > b.nameClient ? 1 : a.nameClient < b.nameClient ? -1 : 0))
        setdatosShow(sortdatos);
    }

    const sortNombreSeller = () => {
        let sortdatos = [...userDatos].sort((a, b) => (a.sellerName > b.sellerName ? 1 : a.sellerName < b.sellerName ? -1 : 0))
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort((b, a) => (a.sellerName > b.sellerName ? 1 : a.sellerName < b.sellerName ? -1 : 0))
        setdatosShow(sortdatos);
    }

    const sortDia = () => {
        let sortdatos = [...userDatos].sort(function (a, b) {
            return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
        })
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort(function (b, a) {
                return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
            })
        if (sortdatos[0] === datosShow[0])
            sortdatos = [...userDatos].sort(function (b, a) {
                return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
            })
        setdatosShow(sortdatos);
    }

    // Sort's Table Sellers
    const sortNombreS = () => {
        let sortdatos = [...sellerDatos].sort((a, b) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        if (sortdatos[0] === datosSellerShow[0])
            sortdatos = [...sellerDatos].sort((b, a) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        setdatosShow(sortdatos);
    }

    React.useEffect(() => {
        getDatos();
    }, [limit, page, params.enable]);

    // Paginate

    const handlePaginate = (n) => {
        setPage(n);
    }

    const handlePaginateNext = (n) => {
        datosRows.hasNextPage && setPage(n);
    }

    const handlePaginatePrev = (n) => {
        datosRows.hasPrevPage && setPage(n);
    }

    const parameterHandler = (e) => {
        let texto = e.target.value.toUpperCase();
        setParams({ ...params, [e.target.name]: texto });
    }

    const enterSearch = (e) => {
        if (params[e.target.name] === '') {
            if (e.target.value.length < 1) {
                delete params[e.target.name]
            }
        }
        if (e.keyCode === 13) {
            e.preventDefault();
            getDatos();
        }
    }

    // Fin Paginate

    const handleChangeRows = (n) => {
        setLimit(n);
    }

    const onClickHandler = (datoFila) => {
        setFila(datoFila);
    }

    const onChangeHandler = (e) => {
        let texto = e.target.value.toUpperCase();
        setFila({ ...fila, [e.target.name]: texto })
    }

    const deleteSaleHandler = async (props) => {
        try {
            await clienteAxios.put(`api/v1/salesupdate/${props._id}`, { enable: "NO" });
        } catch (error) {
            const { response } = error;
            console.log(response);
        }
    }

    return (
        <div className="my-5 container">
            <div className="my-3 row justify-content-between px-3 form-group">
                <h2>Panel Administrador</h2>
                <select className="custom-select col-12 col-md-4" as="select" onChange={e => tablasChange && e.target.value === 'false' ? setTablasChange(!tablasChange) : setTablasChange(true)}>
                    <option selected disabled defaultValue={0}>Cambiar de Tabla</option>
                    <option value={false}>Vendedores</option>
                    <option>Ventas</option>
                </select>
            </div>
            <div className="row justify-content-between px-3 my-3">
                <button data-toggle="modal" data-target="#admin-sale" className="btn btn-secondary  mb-3 mt-2 mt-md-0 col-12 col-md-2">Nueva Venta</button>
                <ModalRegAdminSeller tablasChange={tablasChange} />
            </div>
            <div className="border border-dark tableWrap">
                <AdminSaleModal datos={sellerDatos} />
                <ModalEditSales datos={fila} onChangeHandler={onChangeHandler} tablasChange={tablasChange} getDatos={getDatos} />
                <table className="table table-hover table-bordered">
                    <thead className="text-center thead-dark">
                        <tr>
                            {
                                tablasChange ?
                                    <>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortDia}>Día</p>
                                                <input className="form-control" onChange={parameterHandler} onKeyUp={enterSearch} name="date" placeholder='Día...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombre}>Nombre Cliente</p>
                                                <input className="form-control" onChange={parameterHandler} onKeyUp={enterSearch} name="nameClient" placeholder='Nombre...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortDNI}>DNI</p>
                                                <input className="form-control" onChange={parameterHandler} onKeyUp={enterSearch} name="dniClient" placeholder='DNI...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0">Teléfono</p>
                                                <input className="form-control" onChange={parameterHandler} onKeyUp={enterSearch} name="celphoneClient" placeholder='Teléfono...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombreSeller}>Vendedor</p>
                                                <input className="form-control" onChange={parameterHandler} onKeyUp={enterSearch} name="sellerName" placeholder='Vendedor...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombre}>Tipo Venta</p>
                                                <input className="form-control" onChange={parameterHandler} onKeyUp={enterSearch} name="creditLine" placeholder='Tipo Venta...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortAmount}>Venta</p>
                                                <input className="form-control" onChange={parameterHandler} name="amountApproved" onKeyUp={enterSearch} placeholder='Venta...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky px-1" onClick={sortNombre}>
                                            <p className="text-center mb-2" >Monto Cuotas</p>

                                        </th>
                                        <th className="py-0 px-0 position-sticky"><p className="text-center">Cuotas</p></th>
                                        <th className="py-0 position-sticky">
                                            <select className="custom-select-sm mb-3 rounded" name="enable" onChange={parameterHandler} as="select">
                                                <option selected value="SI">Habilitado</option>
                                                <option value="NO">Deshabilitado</option>
                                            </select>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1"><p className="text-center">Observación</p></th>
                                        <th className="py-0 position-sticky text-nowrap px-1"><p className="text-center">Acción</p></th>
                                    </>
                                    :
                                    <>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3" onClick={sortNombre}>Nombre</th>
                                        <th className="py-0 position-sticky text-nowrap px-1" onClick={sortDNI}>DNI</th>
                                        <th className="py-0 position-sticky text-nowrap px-1">Teléfono</th>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3">Email</th>
                                        <th className="py-0 position-sticky text-nowrap px-1">Venta Total</th>
                                        <th className="py-0 position-sticky text-nowrap px-1">Acción</th>
                                    </>

                            }

                        </tr>

                    </thead>
                    <tbody>
                        <Suspense fallback={
                            <div className="spinner-border text-primary text-center" role="status">
                                <span className="sr-only text-center">Cargando...</span>
                            </div>
                        }>
                            <RowsTable tablasChange={tablasChange} datosShow={datosShow} datosSellerShow={datosSellerShow} onClickHandler={onClickHandler} deleteSaleHandler={deleteSaleHandler} getDatos={getDatos} />
                        </Suspense>
                    </tbody>
                </table>
            </div>
            <Pagination datosRows={datosRows} handlePaginate={handlePaginate} handlePaginateNext={handlePaginateNext} handlePaginatePrev={handlePaginatePrev} page={page} handleChangeRows={handleChangeRows} />
        </div>
    );
}
