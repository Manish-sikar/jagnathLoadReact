import React, { createContext, useState, useMemo, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userData, setUserData] = useState(null);

    const setToken = (token) => {
        setAuthToken(token);
        // Save token to localStorage or cookies
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        // Remove token and data from localStorage or cookies
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUserData(null);
    };

    const setData = (data) => {
        setUserData(data);
    };

    const isAuthenticated = !!authToken;

    const contextValue = useMemo(() => ({
        authToken,
        setToken,
        userData,
        setData,
        logout,
        isAuthenticated,
    }), [authToken, userData]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
