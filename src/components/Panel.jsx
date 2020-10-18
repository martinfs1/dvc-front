import React from 'react';
import TablaCliente from './TablaClientes';
import TablaVendedor from './TablaVendedor';
export default function Panel() {

    const [tablasChange, SetTablasChange] = React.useState(true);

    const handlerTablas = () => {
        SetTablasChange(!tablasChange)
    }

    return (
        <div className="my-5 container">
            { tablasChange ?
                <button onClick={handlerTablas}>Clientes</button>
                :
                <button onClick={handlerTablas}>Vendedores</button>
            }
            { tablasChange ?
                <TablaCliente />
                :
                <TablaVendedor /> 
            }
        </div>
    );
}
