import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import VerifyAccount from './pages/VerifyAccount/VerifyAccount';
import { useAuth } from './hooks/auth';
import { AuthContext } from './store/context';

const App: React.FC = () => {
  const { login, logout, token, user } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path='/home' exact>
          <Home />
        </Route>
        <Redirect to='/home' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Landing />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/verify-account' exact>
          <VerifyAccount />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        user
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
