import React from 'react';

export default function DataTable(props) {

    const { datos, sortAmount, sortDNI, sortNombre, sortSeller, sortDia } = props;

    // const dia = new Date(userDatos.map(e => parseInt(e.date)));

    // console.log(userDatos.map(d => new Date(parseInt(d.date))));
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="text-center thead-dark">
                    <tr>
                        <th className="py-0 position-sticky text-nowrap" colSpan="3" onClick={sortNombre}>Nombre</th>
                        <th className="py-0 position-sticky" onClick={sortDNI}>DNI</th>
                        <th className="py-0 position-sticky">Teléfono</th>
                        <th className="py-0 position-sticky" colSpan="3">Email</th>
                        <th className="py-0 position-sticky">Venta Total</th>
                        <th className="py-0 position-sticky">Acción</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {datos}
                </tbody>
            </table>
        </>
    );
}
