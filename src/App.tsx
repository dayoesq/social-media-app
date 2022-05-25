import { FC } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import VerifyAccount from './pages/VerifyAccount/VerifyAccount';
import { useAuth } from './hooks/auth';
import { AuthContext } from './store/context';
import PasswordChangeRequest from './pages/PasswordChangeRequest/PasswordChangeRequest';

const App: FC = () => {
    const { login, logout, token, user } = useAuth();
    let routes;
    if (token?.length) {
        routes = (
            <Routes>
                <Route element={<Home />} path='/home' />
                <Route element={<Navigate to='/home' />} />
            </Routes>
        );
    } else {
        routes = (
            <Routes>
                <Route element={<Landing />} path='/' />
                <Route element={<Login />} path='/login' />
                <Route element={<Register />} path='/register' />
                <Route element={<VerifyAccount />} path='/verify-account' />
                {/* <Route element={<ForgotPassword />} path='/forgot-password' /> */}
                <Route
                    element={<PasswordChangeRequest />}
                    path='/password-change-request'
                />
                {/* <Route element={<Navigate to='/' />} /> */}

            </Routes>
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
