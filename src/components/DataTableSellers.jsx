import React from 'react';

export default function DataTable(props) {

    const { datos, sortAmount, sortDNI, sortNombre, sortSeller, sortDia } = props;

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="text-center thead-dark">
                    <tr>
                        <th className="py-0 position-sticky text-nowrap" colSpan="3" onClick={sortNombre}>Nombre</th>
                        <th className="py-0 position-sticky text-nowrap" onClick={sortDNI}>DNI</th>
                        <th className="py-0 position-sticky text-nowrap">Teléfono</th>
                        <th className="py-0 position-sticky text-nowrap" colSpan="3">Email</th>
                        <th className="py-0 position-sticky text-nowrap">Venta Total</th>
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
