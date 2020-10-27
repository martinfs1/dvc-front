import React from 'react';
import '../css/Panel.css';
import ModalEditSales from './ModalEditSales';
import clienteAxios from '../config/axios';
import DataTableSales from './DataTableSales';
import DataTableSellers from './DataTableSellers';
import AdminSaleModal from './AdminSaleModal';
import ModalRegAdminSeller from './ModalRegAdminSeller';

export default function Panel() {

    const [tablasChange, setTablasChange] = React.useState(true);

    const [VentasDelMes, setVentasDelMes] = React.useState([]);

    // Tabla 
    const [sellerDatos, setSellerDatos] = React.useState([]);
    const [DatosSellerShow, setDatosSellerShow] = React.useState([]);

    // Tabla Ventas
    const [DatosShow, setDatosShow] = React.useState([]);
    const [userDatos, setUserDatos] = React.useState([]);
    const [fila, setFila] = React.useState({});

    const getDatos = async () => {
        try {
            const sellers = await clienteAxios.get(`api/v1/allseller`);
            const clientes = await clienteAxios.get(`api/v1/allsales`);

            //TablesSales
            setSellerDatos(sellers.data);
            setDatosSellerShow(sellers.data);

            //TablesSales    
            setDatosShow(clientes.data);
            setUserDatos(clientes.data);
        } catch (error) {
            const { response } = error;
            console.log(response);
        }
    }

    // Sort's Table Sales
    let fecha = new Date()

    const ventasMes = () => {
        const actual = fecha.toLocaleString('default', { month: 'long' }) + '/' + fecha.toLocaleString('default', { year: 'numeric'});
        // let ventas = userDatos.filter(item => item.month == actual);
        let ventas = userDatos.filter(m => { return m.month.toLowerCase().includes(actual) });
        setVentasDelMes(ventas);
    }

    const sortAmount = () => {
        let sortDatosAmount = [...userDatos].sort((a, b) => (b.amountApproved - a.amountApproved))
        if (sortDatosAmount[0] === DatosShow[0])
        sortDatosAmount = [...userDatos].sort((b, a) => (b.amountApproved - a.amountApproved))
        setDatosShow(sortDatosAmount)
    }

    const sortDNI = () => {
        let sortdatos = [...userDatos].sort((a, b) => (b.dniClient - a.dniClient))
        if (sortdatos[0] === DatosShow[0])
        sortdatos = [...userDatos].sort((b, a) => (b.dniClient - a.dniClient))
        setDatosShow(sortdatos);
    }

    const sortNombre = () => {
        let sortdatos = [...userDatos].sort((a, b) => (a.nameClient > b.nameClient ? 1 : a.nameClient < b.nameClient ? -1 : 0))
        if (sortdatos[0] === DatosShow[0])
        sortdatos = [...userDatos].sort((b, a) => (a.nameClient > b.nameClient ? 1 : a.nameClient < b.nameClient ? -1 : 0))
        setDatosShow(sortdatos);
    }

    const sortNombreSeller = () => {
        let sortdatos = [...userDatos].sort((a, b) => (a.sellerName > b.sellerName ? 1 : a.sellerName < b.sellerName ? -1 : 0))
        if (sortdatos[0] === DatosShow[0])
        sortdatos = [...userDatos].sort((b, a) => (a.sellerName > b.sellerName ? 1 : a.sellerName < b.sellerName ? -1 : 0))
        setDatosShow(sortdatos);
    }

    const sortDia = () => {
        let sortdatos = [...userDatos].sort(function(a, b){ 
            return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
        })
        if (sortdatos[0] === DatosShow[0]) 
        sortdatos = [...userDatos].sort(function(b, a){ 
            return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
        })
        if (sortdatos[0] === DatosShow[0])
            sortdatos = [...userDatos].sort(function (b, a) {
                return (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
            })
        setDatosShow(sortdatos);
    }

    // Sort's Table Sellers
    const sortNombreS = () => {
        let sortdatos = [...sellerDatos].sort((a, b) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        if (sortdatos[0] === DatosSellerShow[0])
        sortdatos = [...sellerDatos].sort((b, a) => (a.fullname > b.fullname ? 1 : a.fullname < b.fullname ? -1 : 0))
        setDatosShow(sortdatos);
    }


    React.useEffect(() => {
        getDatos();
    }, [fila]);

    React.useEffect(() => {
        ventasMes();
    }, [DatosShow]);

    const onClickHandler = (datoFila) => {
        setFila(datoFila);
    }

    const onChangeHandler = (e) => {
        setFila({ ...fila, [e.target.name]: e.target.value })
    }

    const deleteSaleHandler = async (props) => {
        try {
            await clienteAxios.put(`api/v1/salesupdate/${props._id}`, { enable: false });
        } catch (error) {
            const { response } = error;
            console.log(response);
        }
    }

    const search = (e) => {
        const Filtrados = [];
        let texto = e.target.value.toLowerCase();

        if (tablasChange) {
            for (let datos of userDatos) {
                let titulo = datos.nameClient.toLowerCase();
                let dni = datos.dniClient.toString();
                let dia = datos.date;
                if (titulo.indexOf(texto) !== -1 || dni.indexOf(texto) !== -1 || dia.indexOf(texto) !== -1) {
                    Filtrados.push(datos);
                    setDatosShow(Filtrados.map(f => f))
                }
            }
        } else {
            for (let datos of DatosSellerShow) {
                let nombre = datos.fullname.toLowerCase();
                let email = datos.email.toLowerCase();
                // let dni = datos.dni.toString();
                // let dni = datos.dniClient.toString();
                // let dia = datos.date;
                // || dni.indexOf(texto) !== -1 || dia.indexOf(texto) !== -1
                if (nombre.indexOf(texto) !== -1 || email.indexOf(texto) !== -1) {
                    Filtrados.push(datos);
                    setSellerDatos(Filtrados.map(f => f))
                }
            }
        }
    }

    const RowsSales = (props) => {
        const { datoFila } = props;
        return (
            <tr key={datoFila._id} id={datoFila._id}>
                <th className="py-1 text-nowrap" scope="row">{datoFila.date}</th>
                <td className="py-1 text-nowrap" colSpan="3">{datoFila.nameClient}</td>
                <td className="py-1 text-nowrap">{datoFila.dniClient}</td>
                <td className="py-1 text-nowrap">{datoFila.celphoneClient}</td>
                <td className="py-1 text-nowrap" colSpan="3">{datoFila.sellerName}</td>
                <td className="py-1 text-nowrap">${datoFila.amountApproved}</td>
                <td className="py-1 text-nowrap">{datoFila.feeAmount}</td>
                <td className="py-1 text-nowrap">${datoFila.quotaAmount}</td>
                <td className="py-1 text-nowrap"></td>
                <td className="py-1 text-nowrap"><a data-toggle="modal" href="#exampleModal"><i className="fas fa-edit text-primary mx-1" onClick={() => onClickHandler(datoFila)}></i></a><i role="button" tabIndex="0" className="far fa-trash-alt text-danger mx-1" onClick={() => deleteSaleHandler(datoFila)}></i></td>
            </tr>
        )
    }

    const RowsSellers = (props) => {
        const { datoFila } = props;
        return (
            <tr key={datoFila._id} id={datoFila._id}>
                <th className="py-1 text-nowrap" colSpan="3" scope="row">{datoFila.fullname}</th>
                <td className="py-1 text-nowrap"></td>
                <td className="py-1 text-nowrap">{datoFila.celphone}</td>
                <td className="py-1 text-nowrap" colSpan="3">{datoFila.email}</td>
                <td className="py-1 text-nowrap" ></td>
                <td className="py-1 text-nowrap"><a data-toggle="modal" href="#exampleModal"><i className="fas fa-edit text-primary mx-1" onClick={() => onClickHandler(datoFila)}></i></a><i className="far fa-trash-alt text-danger mx-1"></i></td>
            </tr>
        )
    }

    const filasSales = DatosShow.map(f =>
        <RowsSales datoFila={f} onClickHandler={onClickHandler} />
    );

    const filasSellers = sellerDatos.map(f =>
        <RowsSellers datoFila={f} onClickHandler={onClickHandler} />
    );

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
                <input type="search" className="form-control col-12 col-md-7 w-100" onChange={search} placeholder="Buscar..." />
                {
                    tablasChange ? <button data-toggle="modal" data-target="#admin-Sale" className="btn btn-secondary mt-3 mt-md-0 col-12 col-md-2">Nueva Venta</button> 
                    :
                    <button className="btn btn-secondary mt-3 mt-md-0 col-12 col-md-2">Agregar Vendedor</button>
                }
            </div>
            <ModalRegAdminSeller tablasChange={tablasChange} />
            <div className="border border-dark tableWrap">
                <AdminSaleModal datos={sellerDatos} />
                <ModalEditSales datos={fila} onChangeHandler={onChangeHandler} tablasChange={tablasChange} />
                {
                    tablasChange ?
                        <>
                            <DataTableSales datos={filasSales} sortDNI={sortDNI} sortAmount={sortAmount} sortNombre={sortNombre} sortSeller={sortNombreSeller} sortDia={sortDia} DatosShow={DatosShow}
                            />
                        </>
                        :
                        <>
                            <DataTableSellers datos={filasSellers} sortDNI={sortDNI} sortAmount={sortAmount} sortNombre={sortNombre} sortSeller={sortNombreSeller} sortDia={sortDia}
                            />
                        </>
                }
            </div>
        </div>
    );
}
