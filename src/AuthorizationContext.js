import React, { useState, createContext } from 'react';

export const AuthorizationContext = createContext();

export const AuthorizationProvider = (props) => {

    const [store, setStore] = useState({
        jwt: '',
        role: '',
        username: '',
        isLoggedIn: false
    })

    React.useEffect(() => {
        if (localStorage.getItem('isLoggedIn') !== null) {
            const jwt = JSON.parse(localStorage.getItem('jwt'))
            const role = JSON.parse(localStorage.getItem('role'))
            const username = JSON.parse(localStorage.getItem('username'))
            const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

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

