import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//componentes
import Navbar from './components/Navbar';
import Login from './components/Login'
import Panel from './components/Panel';

function App() {

  return (
    <Router>
      <Route component={Navbar} />
      <Switch>
        <Route path="/panel" exact={true} component={Panel} />
        <Route path="/" exact={true} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
