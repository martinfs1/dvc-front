import React from 'react';
import '../css/Panel.css';
import auth from '../utils/auth';
import TablaCliente from './TablaClientes';
import TablaVendedor from './TablaVendedor';
import RegSeller from './RegSeller';
import clienteAxios from '../config/axios';
import Sweet from 'sweetalert2';
import DataTableExamp from 'react-data-table-component';

export default function Panel() {

    const [tablasChange, SetTablasChange] = React.useState(true);
    const [sellerDatos, setSellerDatos] = React.useState([]);
    const [userDatos, setUserDatos] = React.useState([]);

    const getDatos = async (req, res) => {
        try {
            const sellers = await clienteAxios.get(`api/v1/admin/allseller`);
            const clientes = await clienteAxios.get(`api/v1/admin/allsales`);
            setSellerDatos(sellers.data);
            setUserDatos(clientes.data);
        } catch (error) {
            const { response } = error
        }
    }

    React.useEffect(() => {
        getDatos();
    }, []);

    return (
        <div className="my-5 container">
            <div className="my-5 row justify-content-between px-3 form-group">
                <h2>Panel Administrador</h2>
                <select class="custom-select col-12 col-md-4" onChange={e => SetTablasChange(!tablasChange)}>
                    <option selected disabled>Cambiar de Tabla</option>
                    <option>Vendedores</option>
                    <option>Clientes</option>
                </select>

            </div>
            <div className="border border-dark tableWrap">
                { tablasChange ?
                    <TablaCliente datos={userDatos} />
                    :
                    <TablaVendedor datos={sellerDatos} /> 
                }
            </div>
        </div>
    );
}
