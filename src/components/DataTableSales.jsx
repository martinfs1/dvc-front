import React from 'react';

export default function DataTable(props) {

    const { datos, sortAmount, sortDNI, sortNombre, sortSeller, sortDia, DatosShow } = props;

    // const filasSales = DatosShow.map(f =>
    //     <RowsSales datoFila={f} onClickHandler={onClickHandler} />
    // );

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="text-center thead-dark">
                    <tr>
                        <th className="py-0 position-sticky text-nowrap" onClick={sortDia}>Día</th>
                        <th className="py-0 position-sticky text-nowrap" colSpan="3" onClick={sortNombre}>Nombre Cliente</th>
                        <th className="py-0 position-sticky text-nowrap" onClick={sortDNI}>DNI</th>
                        <th className="py-0 position-sticky text-nowrap">Teléfono</th>
                        <th className="py-0 position-sticky text-nowrap" colSpan="3" onClick={sortSeller}>Vendedor</th>
                        <th className="py-0 position-sticky text-nowrap" onClick={sortAmount}>Venta</th>
                        <th className="py-0 position-sticky text-nowrap">Cuotas</th>
                        <th className="py-0 position-sticky text-nowrap">Monto Cuotas</th>
                        <th className="py-0 position-sticky text-nowrap">Observación</th>
                        <th className="py-0 position-sticky text-nowrap">Acción</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {datos}
                </tbody>
            </table>
        </>
    );
}

