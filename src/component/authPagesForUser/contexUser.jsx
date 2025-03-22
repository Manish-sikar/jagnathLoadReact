import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProviderUser = ({ children }) => {
    // Initialize state from localStorage if the token exists
    const [authTokenUser, setAuthTokenUserState] = useState(() => localStorage.getItem('authTokenUser') || null);
    const [userDataUser, setUserDataUserState] = useState(() => {
        const userData = localStorage.getItem('userDataUser');
        return userData ? JSON.parse(userData) : null;
    });
    const [userBalance, setUserBalanceUserState] = useState(() => {
        const userData = localStorage.getItem('userBalance');
        return userData ? JSON.parse(userData) : null;
    });


    // Set token in localStorage and state
    const setTokenUser = (token) => {
        localStorage.setItem('authTokenUser', token);
        setAuthTokenUserState(token);
    };

    // Logout user: Remove token and data from localStorage and state
    const logoutUser = () => {
        localStorage.removeItem('authTokenUser');
        localStorage.removeItem('userDataUser');
        localStorage.removeItem('partnerEmail');
        setAuthTokenUserState(null);
        setUserDataUserState(null);
    };

    // Set user data and store it in localStorage
    const setDataUser = (data) => {
        localStorage.setItem('userDataUser', JSON.stringify(data));
        setUserDataUserState(data);
    };

    const setuserBalance = (data) => {
        localStorage.setItem('userBalance', JSON.stringify(data));
        setUserBalanceUserState(data);
    };

    const setuserEmail = (data) => {
        localStorage.setItem('partnerEmail', JSON.stringify(data));
    };

    // Check if the user is authenticated
    const isAuthenticatedUser = !!authTokenUser;

    const contextValue = useMemo(() => ({
        authTokenUser,
        setTokenUser,
        userDataUser,
        setuserBalance,
        userBalance,
        setDataUser,
        setuserEmail,
        logoutUser,
        isAuthenticatedUser,
    }), [authTokenUser, userDataUser , userBalance]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthUser = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthUser must be used within an AuthProvider");
    }
    return context;
};
