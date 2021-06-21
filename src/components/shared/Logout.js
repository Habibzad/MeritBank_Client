import { useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'

function Logout() {
    const [, setStore] = useContext(AuthorizationContext)

    const logout = () => {
        setStore({
            jwt: '',
            role: '',
            username: '',
            isLoggedIn: false
        })
        sessionStorage.clear()
    }

    return { logout }
}

export default Logout
