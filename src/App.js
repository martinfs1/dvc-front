import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//componentes
import Navbar from './components/Navbar';
import Login from './components/Login'
import Panel from './components/Panel';
import SellerPage from './pages/SellerPage';

import jwt_decode from 'jwt-decode';


// export const jwtData = React.useContext();  
export const jwtData = React.createContext();

function App(props) {
  
  const { token } = props;

  const [decodedJWT, setDecodedJWT] = React.useState([]);
  const [fullName, setFullName] = React.useState('');

  
  React.useEffect(() => {
    let [] = decodedJWT;
    token && decodedJWT.push(jwt_decode(token))
  }, [token]);

  React.useEffect(() => {
    decodedJWT && decodedJWT.map(d => setFullName(d.user.name))
  }, []);

  return (
    <Router>
      <jwtData.Provider value={fullName}>
        <Route component={Navbar} />
        <Switch>
          <Route path="/panel" exact={true} component={Panel} />
          <Route exact path="/seller" component={SellerPage} />
          <Route path="/" exact={true} component={Login} />
        </Switch>
      </jwtData.Provider>
    </Router>
  );
}

export default App;
