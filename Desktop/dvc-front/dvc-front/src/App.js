import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import clienteAxios from './config/axios'

//componentes
import Login from './components/Login'

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
    <Router>
      <Route path="/" component={Login} />
    </Router>
  );
}

export default App;
