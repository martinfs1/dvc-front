import React from 'react';
import '../css/Header.css'

export default function Administracion() {

    const isLogedIn = false;
    
    return (
        <>
            <nav className="navbar">
                <img className="img-fluid" src={require('../assets/marca-blanca.png')} width="100px" />
                <div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-2">
                            {isLogedIn ?
                                <button className="btn btn-light px-2">Mi Cuenta</button>
                                :
                                <button className="btn btn-light px-2">Iniciar Sesión</button>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

