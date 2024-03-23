import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const AppContext = createContext()
const AppProvider = ({children}) =>{
    const [activeMenu, setActiveMenu] = useState('home')
    const [openSearch, setOpenSearch] = useState(false)
    const [openNofity, setOpenNotify] = useState(false)
    const [cookies, setCookie] = useCookies(['user', 'loginToken']);
    const [user, setUser] = useState([])
    
    useEffect(() => {
        setUser(cookies.user)
    }, [])
    
    return <AppContext.Provider value={
        {activeMenu, setActiveMenu,
             openSearch, setOpenSearch,
            openNofity, setOpenNotify, user, setUser, cookies, setCookie}
        }>
        {children}
    </AppContext.Provider>
}

export default AppProvider