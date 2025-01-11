import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MusicList from './pages/MusicList';
import AdminPanel from './pages/admin';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';


const App = () => {
    const { user } = useContext(AuthContext);

    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/login" />;
    };

    const AdminRoute = ({ children }) => {
        return user && user.isAdmin ? children : <Navigate to="/" />;
    };

    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/musics" element={<PrivateRoute><MusicList /></PrivateRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
            </Routes>
    );
};

export default App;
