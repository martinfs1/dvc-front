import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import clienteAxios from './config/axios'

//componentes
import Login from './components/Login'
import FormSeller from './pages/FormSeller';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/seller" component={FormSeller} />
      </Switch>

    </Router>
  );
}

export default App;
