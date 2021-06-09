import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
// import User from './components/User/User';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';

const App: React.FC = () => {
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
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
