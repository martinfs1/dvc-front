import React from 'react';
import DataTableExamp from 'react-data-table-component';
import clienteAxios from '../config/axios';
import Sweet from 'sweetalert2';

export default function DataTable() {

    const dia = new Date(userDatos.map(e => parseInt(e.date)));

    console.log(userDatos.map(d => new Date(parseInt(d.date))));

    const columnasVendedores = [
        {
            name: 'Nombre Completo',
            selector: 'fullname',
            sortable: true,
        },
        {
            name: 'Posicion',
            selector: 'roleType',
            sortable: true,
        },
        {
            name: 'Teléfono',
            selector: 'celphone',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Dirección',
            selector: 'address',
            sortable: true,
        }
    ]
    
    const columnasClientes = [
        {
            name: 'Fecha',
            selector: 'date',
            sortable: true,
            // center: true
        },
        {
            name: 'Nombre Completo',
            selector: 'nameClient',
            sortable: true,
            grow: 2
            // center: true
        },
        {
            name: 'Teléfono',
            selector: 'celphoneClient',
            sortable: true,
        },
        {
            name: 'DNI',
            selector: 'dniClient',
            sortable: true,
        },
        {
            name: 'Préstamo',
            selector: 'amountApproved',
            sortable: true,
        },
        {
            name: 'Cuotas',
            selector: 'quotaAmount',
            sortable: true,
        },
        {
            name: '% cuota',
            selector: 'feeAmount',
            sortable: true,
        },
        {
            name: 'Tipo',
            selector: 'typeOperation',
            sortable: true,
        },
    ]

    const optionsPagination = {
        rowsPerPageText: 'Filas',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todas'
    }
    
    return (
        <>
        {/* <DataTableExamp
                    columns={ !tablasChange ? columnasVendedores : columnasClientes}
                    data={ !tablasChange ? sellerDatos : userDatos }
                    title={ !tablasChange ? <h2 className="text-center">Tabla Vendedores</h2> : <h2 className="text-center">Tabla Clientes</h2> }
                    pagination
                    paginationComponentOptions={optionsPagination}
                    fixedHeader
                    fixedHeaderScrollHeight='1200px'
                    // responsive={true}
                /> */}
            <DataTableExamp 
            columns={columnas}
            data={sellerDatos}
            title='Tabla'
            pagination
            paginationComponentOptions={optionsPagination}
            />
        </>
    );
}

