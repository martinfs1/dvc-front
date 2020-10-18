import React from 'react';

export default function Tabla() {

    const dia = new Date();
    const [diaCredito, setDiaCredito] = React.useState('');
    const tabla = React.useRef(null);

    React.useEffect(() => {
        handlerCreatePrestamo();
    }, [])

    const handlerCreatePrestamo = () => {
        setDiaCredito(`${dia.getDate()}/${dia.getMonth()}/${dia.getFullYear()}`);
    }

    return (
        <div className="my-5 container">

                <table className="table table-hover table-borderer" ref={tabla}>
                    <thead>
                        <tr className="border-info">
                            <th className="py-1">Día</th>
                            <th className="py-1" colspan="2">Nombre Cliente</th>
                            <th className="py-1">DNI</th>
                            <th className="py-1">Teléfono</th>
                            <th className="py-1">Monto Crédito</th>
                            <th className="py-1">N° Cuotas</th>
                            <th className="py-1">Monto Cuotas</th>
                            <th className="py-1">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-info">
                            <th className="py-1" scope="row">{diaCredito}</th>
                            <td className="py-1" colspan="2">Marco Baiad</td>
                            <td className="py-1">39977116</td>
                            <td className="py-1">3816261384</td>
                            <td className="py-1">$100.000</td>
                            <td className="py-1">12</td>
                            <td className="py-1">8.333,33</td>
                            <td className="py-1"><button>Editar</button></td>
                        </tr>
                        <tr className="border-info">
                            <th className="py-1" scope="row">{diaCredito}</th>
                            <td className="py-1" colspan="2">Marco Baiad</td>
                            <td className="py-1">39977116</td>
                            <td className="py-1">3816261384</td>
                            <td className="py-1">$100.000</td>
                            <td className="py-1">12</td>
                            <td className="py-1">8.333,33</td>
                            <td className="py-1"><button>Editar</button></td>
                        </tr>
                        <tr className="border-info">
                            <th className="py-1" scope="row">{diaCredito}</th>
                            <td className="py-1" colspan="2">Marco Baiad</td>
                            <td className="py-1">39977116</td>
                            <td className="py-1">3816261384</td>
                            <td className="py-1">$100.000</td>
                            <td className="py-1">12</td>
                            <td className="py-1">8.333,33</td>
                            <td className="py-1"><button>Editar</button></td>
                        </tr>
                    </tbody>
                </table>
        </div>
    );
}
