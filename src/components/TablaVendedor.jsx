import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import '../css/Panel.css';

export default function Tabla(props) {

    const { datos } = props

    console.log(datos);

    // const dia = new Date();
    // const [diaCredito, setDiaCredito] = React.useState('');
    

    // React.useEffect(() => {
    //     handlerCreatePrestamo();
    // }, [])

    // const handlerCreatePrestamo = () => {
    //     setDiaCredito(`${dia.getDate()}/${dia.getMonth()}/${dia.getFullYear()}`);
    // }

    const products = datos;
    const columns = [
    {
        dataField: 'fullname',
        text: 'Nombre Completo',
        headerClasses: 'text-center table-dark',
        sort: true,
        filter: textFilter({
            placeholder: 'Nombre...',  // custom the input placeholder
            className: 'py-0', // custom classname on input
            defaultValue: '', // default filtering value
            delay: 500, // how long will trigger filtering after user typing, default is 500 ms
            // getFilter: (f) => { ... }, // accept callback function and you can call it for filter programmtically
            id: 'id', // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
        })
    }, {
        dataField: 'celphone',
        text: 'Teléfono',
        headerClasses: 'text-center table-dark',
    }, {
        dataField: 'email',
        text: 'Email',
        headerClasses: 'text-center table-dark',
        filter: textFilter({
            placeholder: 'Nombre...',  // custom the input placeholder
            className: 'py-0', // custom classname on input
            defaultValue: '', // default filtering value
            delay: 500, // how long will trigger filtering after user typing, default is 500 ms
            // getFilter: (f) => { ... }, // accept callback function and you can call it for filter programmtically
            id: 'id', // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
        })

    }, {
        dataField: 'address',
        text: 'Domicilio',
        headerClasses: 'text-center table-dark',
        filter: textFilter({
            placeholder: 'Nombre...',  // custom the input placeholder
            className: 'py-0', // custom classname on input
            defaultValue: '', // default filtering value
            delay: 500, // how long will trigger filtering after user typing, default is 500 ms
            // getFilter: (f) => { ... }, // accept callback function and you can call it for filter programmtically
            id: 'id', // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
        })
    },
    ];
 

    const customTotal = (from, to) => (
        <span className="react-bootstrap-table-pagination-total mx-2">
          { from } de { to }
        </span>
    );
      
    const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: '<<',
    lastPageText: '>>',
    prePageText: '<',
    nextPageText: '>',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: '<<',
    lastPageTitle: '>>',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
        text: '20', value: 20
    }, {
        text: '50', value: 50
    }, {
        text: '100', value: 100
    }, {
        text: 'Todos', value: products.length
    }]
    }; 

    // const dia = new Date();
    // const [diaCredito, setDiaCredito] = React.useState('');

    // React.useEffect(() => {
    //     handlerCreatePrestamo();
    // }, [])


    // const handlerCreatePrestamo = () => {
    //     setDiaCredito(`${dia.getDate()}/${dia.getMonth()}/${dia.getFullYear()}`);
    // }

    return (
        <>
            
            <BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory(options) } filter={ filterFactory() } />
            {/* <table className="table table-hover table-bordered">
                <thead className="text-center thead-dark">
                    <tr>
                        <th className="py-0 position-sticky">Día</th>
                        <th className="py-0 position-sticky text-nowrap" colSpan="2">Nombre Cliente</th>
                        <th className="py-0 position-sticky">DNI</th>
                        <th className="py-0 position-sticky">Teléfono</th>
                        <th className="py-0 position-sticky">Monto Crédito</th>
                        <th className="py-0 position-sticky">N° Cuotas</th>
                        <th className="py-0 position-sticky">Monto Cuotas</th>
                        <th className="py-0 position-sticky">Acción</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>
                    <tr>
                        <th className="py-1" scope="row">{diaCredito}</th>
                        <td className="py-1" colSpan="2">Marco Baiad</td>
                        <td className="py-1">39977116</td>
                        <td className="py-1">3816261384</td>
                        <td className="py-1">$100.000</td>
                        <td className="py-1">12</td>
                        <td className="py-1">8.333,33</td>
                        <td className="py-1"><i className="fas fa-edit text-primary mx-1"></i><i className="far fa-trash-alt text-danger mx-1"></i></td>
                    </tr>

                </tbody>
            </table> */}
        </>
    );
}
