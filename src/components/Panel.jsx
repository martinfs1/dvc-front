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
    const [montosTotales, setMontosTotales] = React.useState([]);
    const [montosTotalesShow, setMontosTotalesShow] = React.useState([]);

    // Tabla Ventas
    const [datosShow, setdatosShow] = React.useState([]);
    const [userDatos, setUserDatos] = React.useState([]);
    const [fila, setFila] = React.useState({});

    // Paginacion 
    const [limit, setLimit] = React.useState(20);
    const [page, setPage] = React.useState(1);
    const [datosRows, setDatosRows] = React.useState([]);
    const [params, setParams] = React.useState({ enable: 'SI' })


    const getDatos = async () => {
        try {
            const sellers = await clienteAxios.get(`api/v1/allseller`);
            const amountTotals = await clienteAxios.get(`api/v1/montosales`, {
                params: {

                }
            });
            const ventas = await clienteAxios.get(`api/v1/allsales`, {
                params: {
                    page: page,
                    limit: limit,
                    ...params
                }
            })

            setMontosTotales(amountTotals.data);
            setMontosTotalesShow(amountTotals.data);

            // TablesSales
            setSellerDatos(sellers.data.docs);
            setdatosSellerShow(sellers.data.docs);

            //TablesSales    
            setdatosShow(ventas.data.docs);
            setUserDatos(ventas.data.docs);
            setDatosRows(ventas.data);

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
        let sortdatos = [...montosTotales].sort((a, b) => (a.seller.fullname > b.seller.fullname ? 1 : a.seller.fullname < b.seller.fullname ? -1 : 0))
        if (sortdatos[0] === montosTotalesShow[0])
            sortdatos = [...montosTotales].sort((b, a) => (a.seller.fullname > b.seller.fullname ? 1 : a.seller.fullname < b.seller.fullname ? -1 : 0))
        setMontosTotalesShow(sortdatos);
    }

    const sortDNISe = () => {
        let sortdatos = [...montosTotales].sort((a, b) => (b.seller.dni - a.seller.dni))
        if (sortdatos[0] === montosTotalesShow[0])
            sortdatos = [...montosTotales].sort((b, a) => (b.seller.dni - a.seller.dni))
        setMontosTotalesShow(sortdatos);
    }

    const sortDiaS = () => {
        let sortdatos = [...montosTotales].sort(function (a, b) {
            return (a.year > b.year ? 1 : a.year < b.year ? -1 : 0)
        })
        if (sortdatos[0] === montosTotalesShow[0])
            sortdatos = [...montosTotales].sort(function (b, a) {
                return (a.year > b.year ? 1 : a.year < b.year ? -1 : 0)
            })
        if (sortdatos[0] === montosTotalesShow[0])
            sortdatos = [...montosTotales].sort(function (b, a) {
                return (a.year > b.year ? 1 : a.year < b.year ? -1 : 0)
            })
        setMontosTotalesShow(sortdatos);
    }

    const sortEnero = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.enero - a.enero))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.enero - a.enero))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortFebrero = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.febrero - a.febrero))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.febrero - a.febrero))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortMarzo = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.marzo - a.marzo))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.marzo - a.marzo))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortAbril = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.abril - a.abril))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.abril - a.abril))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortMayo = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.mayo - a.mayo))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.mayo - a.mayo))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortJunio = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.junio - a.junio))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.junio - a.junio))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortJulio = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.julio - a.julio))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.julio - a.julio))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortAgosto = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.agosto - a.agosto))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.agosto - a.agosto))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortSeptiembre = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.septiembre - a.septiembre))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.septiembre - a.septiembre))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortOctubre = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.octubre - a.octubre))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.octubre - a.octubre))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortNoviembre = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.noviembre - a.noviembre))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.noviembre - a.noviembre))
        setMontosTotalesShow(sortDatosAmount)
    }

    const sortDiciembre = () => {
        let sortDatosAmount = [...montosTotales].sort((a, b) => (b.diciembre - a.diciembre))
        if (sortDatosAmount[0] === montosTotalesShow[0])
            sortDatosAmount = [...montosTotales].sort((b, a) => (b.diciembre - a.diciembre))
        setMontosTotalesShow(sortDatosAmount)
    }

    const search = (e) => {
        const Filtrados = [];
        let texto = e.target.value.toUpperCase();
        for (let montos of montosTotales) {
            let name = montos.seller.fullname;
            let dni = montos.seller.dni.toString();
            let year = montos.year;
            if (name.indexOf(texto) !== -1 || dni.indexOf(texto) !== -1 || year.indexOf(texto) !== -1) {
                Filtrados.push(montos);
                setMontosTotalesShow(Filtrados.map(f => f))
            }
        }
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
            getDatos()
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
                <AdminSaleModal getDatos={getDatos} datos={sellerDatos} />
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
                                                <input className="form-control" onChange={parameterHandler} onKeyUp={enterSearch} name="fullname" placeholder='Vendedor...' />
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
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortDiaS}>Año</p>
                                                <input className="form-control" onChange={search} onKeyUp={enterSearch} name="year" placeholder='Año...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1" colSpan="3">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortNombreS}>Vendedor</p>
                                                <input className="form-control" onChange={search} onKeyUp={enterSearch} name="fullname" placeholder='Vendedor...' />
                                            </div>
                                        </th>
                                        <th className="py-0 position-sticky text-nowrap px-1">
                                            <div className="row justify-content-center mx-0 input-group-sm pb-2">
                                                <p className="mb-0" onClick={sortDNISe}>DNI</p>
                                                <input className="form-control" onChange={search} onKeyUp={enterSearch} name="dni" placeholder='DNI...' />
                                            </div>
                                        </th>
                                        <th className="position-sticky text-nowrap text-center px-1">Venta Total</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortEnero}>Enero</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortFebrero}>Febrero</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortMarzo}>Marzo</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortAbril}>Abril</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortMayo}>Mayo</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortJunio}>Junio</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortJulio}>Julio</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortAgosto}>Agosto</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortSeptiembre}>Septiembre</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortOctubre}>Octubre</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortNoviembre}>Noviembre</th>
                                        <th className="position-sticky text-nowrap text-center px-1" onClick={sortDiciembre}>Diciembre</th>
                                        <th className="position-sticky text-nowrap text-center px-1">Accion</th>
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
                            <RowsTable tablasChange={tablasChange} datosShow={datosShow} montosTotalesShow={montosTotalesShow} datosSellerShow={datosSellerShow} onClickHandler={onClickHandler} deleteSaleHandler={deleteSaleHandler} getDatos={getDatos} />
                        </Suspense>
                    </tbody>
                </table>
            </div>
            <Pagination datosRows={datosRows} datosShow={datosShow} montosTotalesShow={montosTotalesShow} tablasChange={tablasChange} handlePaginate={handlePaginate} handlePaginateNext={handlePaginateNext} handlePaginatePrev={handlePaginatePrev} page={page} handleChangeRows={handleChangeRows} />
        </div>
    );
}
