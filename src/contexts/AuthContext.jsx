import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('tms-user')));
    const navigate = useNavigate();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('tms-user')));
    }, []);

    const login = async (username, password) => {
        await axios.post('https://tws.techmedia.one/api/login/', { username, password }).then(response => {
            if (response.data.success) {
                localStorage.setItem('tms-user', JSON.stringify(response.data));
                setUser(response.data);
            };
        });
    };

    const logout = () => {
        localStorage.removeItem('tms-user');
        navigate("/login")
    };

    const value = { user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
