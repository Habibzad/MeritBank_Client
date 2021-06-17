import React, { useState, useEffect, createContext } from 'react';

export const AuthorizationContext = createContext();

export const AuthorizationProvider = (props) => {

    const [store, setStore] = useState({
        jwt: '',
        role: '',
        username: '',
        isLoggedIn: false,
        successMessage: '',
        errorMessage: ''
    })

    useEffect(() => {
        if (sessionStorage.getItem('isLoggedIn') !== null) {
            const jwt = JSON.parse(sessionStorage.getItem('jwt'))
            const role = JSON.parse(sessionStorage.getItem('role'))
            const username = JSON.parse(sessionStorage.getItem('username'))
            const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'))

            setStore({
                jwt: jwt,
                role: role,
                username: username,
                isLoggedIn: isLoggedIn
            })
        }
    }, [])

    return (
        <AuthorizationContext.Provider value={[store, setStore]}>
            {props.children}
        </AuthorizationContext.Provider>
    )
}

