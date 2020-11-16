import React from 'react';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Paginator({ datosRowsSales, datosRowsSellers, montosTotalesShow, datosShow, handlePaginate, handlePaginateNext, handlePaginatePrev, handleChangeRows, page, tablasChange }) {

    const paginas = tablasChange ? datosRowsSales.totalPages : datosRowsSellers.totalPages;
    const currentPage = tablasChange ? datosRowsSales.page : datosRowsSellers.page;
    const [arrOfCurrButtons, setArrOfCurrButtons] = React.useState([])

    const RowsNumber = [];
    for (let index = 1; index <= paginas; index++) {
        RowsNumber.push(index);
    }

    const [changeN, setChangeN] = React.useState(20)

    React.useEffect(() => {
        handleChangeRows(changeN)
    }, [changeN]);

    React.useEffect(() => {
        let tempNumberOfPages = [...RowsNumber]
        if (currentPage >= 1 && currentPage <= 3 && paginas >= 2) {
            tempNumberOfPages = [1, 2, 3, 4, '...', RowsNumber.length]
        } else if (currentPage === 4) {
            const sliced = RowsNumber.slice(0, 5)
            tempNumberOfPages = [...sliced, "...", RowsNumber.length]
        } else if (currentPage > 4 && currentPage < RowsNumber.length - 2) {
            const sliced1 = RowsNumber.slice(currentPage - 2, currentPage);
            const sliced2 = RowsNumber.slice(currentPage, currentPage + 1);
            tempNumberOfPages = ([1, "...", ...sliced1, sliced2, "...", RowsNumber.length])
        } else if (currentPage > RowsNumber.length - 3) {
            const sliced = RowsNumber.slice(RowsNumber.length - 4);
            tempNumberOfPages = ([...sliced])
        }
        setArrOfCurrButtons(tempNumberOfPages)

        let tempNumberOfPagesSellers = [...RowsNumber]
        if (currentPage >= 1 && currentPage <= 3 && paginas > 2) {
            tempNumberOfPagesSellers = [1, 2, 3, 4, '...', RowsNumber.length]
        } else if (currentPage === 4) {
            const sliced = RowsNumber.slice(0, 5)
            tempNumberOfPagesSellers = [...sliced, "...", RowsNumber.length]
        } else if (currentPage > 4 && currentPage < RowsNumber.length - 2) {
            const sliced1 = RowsNumber.slice(currentPage - 2, currentPage);
            const sliced2 = RowsNumber.slice(currentPage, currentPage + 1);
            tempNumberOfPagesSellers = ([1, "...", ...sliced1, sliced2, "...", RowsNumber.length])
        } else if (currentPage > RowsNumber.length - 3) {
            const sliced = RowsNumber.slice(RowsNumber.length - 4);
            tempNumberOfPagesSellers = ([...sliced])
        }
        setArrOfCurrButtons(tempNumberOfPagesSellers)
    }, [currentPage, paginas])

    console.log(datosRowsSellers.hasPrevPage);
    console.log(datosRowsSellers.prevPage);

    return (
        <div className="row mx-0 justify-content-around flex-nowrap">
            <select onChange={(e) => setChangeN(parseInt(e.target.value))} className="custom-select-sm">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value={datosRowsSales.totalDocs}>Todo</option>
            </select>
            <nav aria-label="...">
                <ul className="pagination pagination-sm">
                    <li>
                        <span onClick={() => page == 1 ? '' : handlePaginate(1)} role="button" tabIndex="0" className="page-link">&le;&le;</span>
                    </li>
                    <li className="page-item">
                        <span onClick={() => tablasChange ? datosRowsSales.hasPrevPage && handlePaginatePrev(datosRowsSales.prevPage) : datosRowsSellers.hasPrevPage && handlePaginatePrev(datosRowsSellers.prevPage)} role="button" tabIndex="0" className="page-link">&le;</span>
                    </li>
                    {   
                        arrOfCurrButtons.map(p => {
                            return (
                                <li className={`page-item ${currentPage == p && 'active'}`}>
                                    <span onClick={() => handlePaginate(p)}
                                        key={p}
                                        role="button"
                                        tabIndex="0"
                                        className="page-link">
                                        {p}
                                    </span>
                                </li>
                            )
                        })
                    }
                    <li className="page-item">
                        <span onClick={() => tablasChange ? datosRowsSales.hasNextPage && handlePaginateNext(datosRowsSales.nextPage) : datosRowsSellers.hasNextPage && handlePaginateNext(datosRowsSellers.nextPage)} role="button" tabIndex="0" className="page-link">&ge;</span>
                    </li>
                    <li>
                        <span onClick={() => tablasChange ? handlePaginate(datosRowsSales.totalPages) : handlePaginate(datosRowsSellers.totalPages)} role="button" tabIndex="0" className="page-link">&ge;&ge;</span>
                    </li>
                </ul>
            </nav>
            <div>
                <Download datosShow={datosShow} montosTotalesShow={montosTotalesShow} tablasChange={tablasChange} />
            </div>
        </div>
    );
}

class Download extends React.Component {

    render() {
        return (
            <>
                {
                    this.props.tablasChange ?
                        <ExcelFile element={<i className="far fa-file-excel text-success" type="button" tabIndex="-1"> Excel</i>} filename="excel">
                            <ExcelSheet data={this.props.datosShow} name="Hoja 1">
                                <ExcelColumn label="Día" value="date" />
                                <ExcelColumn label="NomreCliente" value="nameClient" />
                                <ExcelColumn label="Vendedor" value="fullname" />
                                <ExcelColumn label="DNI" value="dniClient" />
                                <ExcelColumn label="N° Celular" value="celphoneClient" />
                                <ExcelColumn label="Monto Aprobado" value="amountApproved" />
                                <ExcelColumn label="Cuotas" value="feeAmount" />
                                <ExcelColumn label="Monto Cuotas" value="quotaAmount" />
                                <ExcelColumn label="Cliente Nuevo" value="newClient" />
                                <ExcelColumn label="Detalle" value="saleDetail" />
                                <ExcelColumn label="Linea de Crédito" value="creditLine" />
                                <ExcelColumn label="Operación" value="typeOperation" />
                            </ExcelSheet>
                        </ExcelFile>
                        :
                        <ExcelFile element={<i className="far fa-file-excel text-success" type="button" tabIndex="-1"> Excel</i>} filename="excel">
                            <ExcelSheet data={this.props.montosTotalesShow} name="Hoja 2">
                                <ExcelColumn label="Año" value="year" />
                                <ExcelColumn label="Nombre Vendedor" value={(col) => col.seller.fullname} />
                                <ExcelColumn label="DNI" value={(col) => col.seller.dni} />
                                <ExcelColumn label="Venta Total" value={(col) => col.annualAmountApproved} />
                                <ExcelColumn label="Enero" value="enero" />
                                <ExcelColumn label="Febrero" value="febrero" />
                                <ExcelColumn label="Marzo" value="marzo" />
                                <ExcelColumn label="Abril" value="abril" />
                                <ExcelColumn label="Mayo" value="mayo" />
                                <ExcelColumn label="Junio" value="junio" />
                                <ExcelColumn label="Julio" value="julio" />
                                <ExcelColumn label="Agosto" value="agosto" />
                                <ExcelColumn label="Septiembre" value="septiembre" />
                                <ExcelColumn label="Octubre" value="octubre" />
                                <ExcelColumn label="Noviembre" value="noviembre" />
                                <ExcelColumn label="Diciembre" value="diciembre" />
                            </ExcelSheet>
                        </ExcelFile>

                }
            </>
        );
    }
}

export default Paginator;