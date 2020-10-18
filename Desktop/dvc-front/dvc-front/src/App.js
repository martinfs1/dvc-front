import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//pages
import SellerPage from './pages/SellerPage';

//componentes
import Login from './components/Login';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/seller" component={SellerPage} />
        <Route exact path="/" component={Login} />
      </Switch>

    </Router>
  );
}

export default App;
