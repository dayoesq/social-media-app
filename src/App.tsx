import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import VerifyAccount from './pages/VerifyAccount/VerifyAccount';
import { useAuth } from './hooks/auth';
import { AuthContext } from './store/context';
import PasswordChangeRequest from './pages/PasswordChangeRequest/PasswordChangeRequest';
import Profile from './pages/Profile/Profile';
// import NotFound from './pages/NotFound/NotFound';

const App: FC = () => {
    const { login, logout, token, user } = useAuth();
    let routes;
    if (token && token.length && user?.isLoggedIn) {
        routes = (
            <Routes>
                <Route caseSensitive path='/' element={<Home />}>
                    <Route path=':userName' element={<Profile />} />
                </Route>
            </Routes>
        );
    } else {
        routes = (
            <Routes>
                <Route caseSensitive element={<Landing />} path='/' />
                <Route caseSensitive element={<Login />} path='login' />
                <Route caseSensitive element={<Register />} path='register' />
                <Route
                    caseSensitive
                    element={<VerifyAccount />}
                    path='verify-account'
                />
                {/* <Route element={<ForgotPassword />} path='/forgot-password' /> */}
                <Route
                    element={<PasswordChangeRequest />}
                    path='password-change-request'
                />
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
