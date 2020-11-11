import React from 'react';
import ExcelExport from 'react-export-excel';

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

function Paginator({ times, datosRows, handlePaginate, handlePaginateNext, handlePaginatePrev, handleChangeRows, page }) {


    const paginas = datosRows.totalPages;
    const currentPage = datosRows.page;
    const [ arrOfCurrButtons, setArrOfCurrButtons ] = React.useState([])

    const RowsNumber = [];
    for (let index = 1; index <= paginas; index++) {
        RowsNumber.push(index);
    }

    console.log(datosRows);

    const [changeN, setChangeN] = React.useState(20)

    React.useEffect(() => {
        handleChangeRows(changeN)
    }, [changeN]);

    React.useEffect(() => {
        let tempNumberOfPages = [...RowsNumber]
        if (page >= 1 && page <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, '...', RowsNumber.length]
        } else if (currentPage === 4) {
            const sliced = RowsNumber.slice(0, 5)
            tempNumberOfPages = [...sliced, "...", RowsNumber.length]
        } else if (currentPage > 4 && currentPage < RowsNumber.length -2) {
            const sliced1 = RowsNumber.slice(currentPage -2, currentPage);
            const sliced2 = RowsNumber.slice(currentPage, currentPage +1);
            tempNumberOfPages = ([1, "...", ...sliced1, sliced2, "...", RowsNumber.length])
        } else if (currentPage > RowsNumber.length -3) {
            const sliced = RowsNumber.slice(RowsNumber.length -4);
            tempNumberOfPages = ([1, "...", ...sliced])
        }
        setArrOfCurrButtons(tempNumberOfPages)
    }, [currentPage])

    return (
        <div className="row mx-0 justify-content-around flex-nowrap">
            <select onChange={(e) => setChangeN(parseInt(e.target.value))} className="custom-select-sm">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value={datosRows.totalDocs}>Todo</option>
            </select>
            <nav aria-label="...">
                <ul className="pagination pagination-sm">
                    <li>
                        <span onClick={() => page == 1 ? '' : handlePaginate(1)} role="button" tabIndex="0" className="page-link">&le;&le;</span>
                    </li>
                    <li className="page-item">
                        <span onClick={() => datosRows.prevPage && handlePaginatePrev(datosRows.prevPage)} role="button" tabIndex="0" className="page-link">&le;</span>
                    </li>
                    {
                        arrOfCurrButtons.map(p => {
                            return(
                                <li className={`page-item ${
                                    currentPage == p && 'active'}`}>
                                    <span onClick={() => handlePaginate(p)} 
                                    role="button" 
                                    tabIndex="0" 
                                    className="page-link">
                                        {p}
                                    </span>
                                </li>       
                            )
                        })
                    }
                    
                    {/* {page == datosRows.totalPages ?
                        <>
                            <li className={`page-item -2 ${Number(page - 2) == Number(datosRows.page) && 'active'}`}><span onClick={() => handlePaginate((Number(page) - 2))} role="button" tabIndex="0" className="page-link">{page - 2}</span></li>
                            <li className={`page-item -1 ${Number(page - 1) == Number(datosRows.page) && 'active'}`}><span onClick={() => Number(page) == Number(datosRows.pages) ? console.log('Ultima pagina') : handlePaginate((Number(page) - 1))} role="button" tabIndex="0" className="page-link">{page - 1}</span></li>
                        </>
                        :
                        ''
                    }
                    {page == (Number(datosRows.totalPages) - 1) ?
                        <>
                            <li className={`page-item -1 ${Number(page - 1) == Number(datosRows.page) && 'active'}`}><span onClick={() => Number(page) == Number(datosRows.pages) ? console.log('Ultima pagina') : handlePaginate((Number(page) - 1))} role="button" tabIndex="0" className="page-link">{page - 1}</span></li>
                        </>
                        :
                        ''

                    }
                    {page &&
                        <li className={`page-item ${Number(page) == Number(datosRows.page) && 'active'}`}><span onClick={() => handlePaginate(1)} role="button" tabIndex="0" className="page-link">{page}</span></li>
                    }
                    {page == datosRows.totalPages ?
                        ''
                        :
                        <>
                            <li className={`page-item segundo ${Number(page + 2) == Number(datosRows.page) && 'active'}`}><span onClick={() => handlePaginate(2)} role="button" tabIndex="0" className="page-link">{page + 1}</span></li>
                        </>
                    }

                    {
                        page == datosRows.totalPages || page == (Number(datosRows.totalPages) - 1) ?
                            ''
                            :
                            <>
                                <li className={`page-item tercero ${Number(page + 3) == Number(datosRows.page) && 'active'}`}><span onClick={() => Number(page) == Number(datosRows.pages) ? console.log('Ultima pagina') : handlePaginate(3)} role="button" tabIndex="0" className="page-link">{page + 2}</span></li>
                            </>

                    } */}
                    <li className="page-item">
                        <span onClick={() => datosRows.hasNextPage && handlePaginateNext(datosRows.nextPage)} role="button" tabIndex="0" className="page-link">&ge;</span>
                    </li>
                    <li>
                        <span onClick={() => handlePaginate(datosRows.totalPages)} role="button" tabIndex="0" className="page-link">&ge;&ge;</span>
                    </li>
                </ul>
            </nav>
            <div>
                <Download datosRows={datosRows.docs} times={times} />
            </div>
        </div>
    );
}

class Download extends React.Component {
    
    render() {
        return (
            <ExcelFile element={<i className="far fa-file-excel text-success" type="button" tabIndex="-1"> Excel</i>} filename="excel">
                <ExcelSheet dataSet={this.props.datosRows} name="Hoja 1">
                    <ExcelColumn label="Día" value="date" />
                    <ExcelColumn label="NomreCliente" value="nameClient" />
                    <ExcelColumn label="Vendedor" value="sellerName" />
                    <ExcelColumn label="DNI" value="dniClient" />
                    <ExcelColumn label="N° Celuar" value="celphoneClient" />
                    <ExcelColumn label="Monto Aprobado" value="amountApproved" />
                    <ExcelColumn label="Cuotas" value="feeAmount" />
                    <ExcelColumn label="Monto Cuotas" value="quotaAmount" />
                    <ExcelColumn label="Cliente Nuevo" value="newClient" />
                    <ExcelColumn label="Detalle" value="saleDetail" />
                    <ExcelColumn label="Linea de Credito" value="creditLine" />
                    <ExcelColumn label="Operación" value="typeOperation" />
                    {/* <ExcelColumn label="timeVenta" value={(col) => col.date ? new Date(col.date).getTime() : col.date} /> */}
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default Paginator;