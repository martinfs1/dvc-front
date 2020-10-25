import React from 'react';

const tokenLocal = localStorage.getItem('token');
const [token, setToken] = React.useState('');

const seteadoToken = () => {
    setToken(tokenLocal)
}

export const contectoToken = {
    tokenStorage: {
        tokendelLocal: `${tokenLocal}`
    },
    stadoToken: {
        tokendelEstado: `${token}`
    }
}

React.useEffect(() => {
    seteadoToken();
}, [tokenLocal])
const TokenContext = React.createContext(token);

export default TokenContext;