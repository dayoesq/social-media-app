import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import VerifyAccount from './pages/VerifyAccount/VerifyAccount';
// import { AuthContext } from './store/context';


const App: React.FC = () => {
    // const authCtx = useContext(AuthContext);
    // let routes;
    // if(authCtx.)
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Landing />
                    </Route>
                    <Route path="/home" exact>
                        <Home />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                    <Route path="/verify-account" exact>
                        <VerifyAccount />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
