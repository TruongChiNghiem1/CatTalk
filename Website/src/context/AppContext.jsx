import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
export const AppContext = createContext()
const AppProvider = ({children}) =>{
    const [activeMenu, setActiveMenu] = useState('home')
    const [openSearch, setOpenSearch] = useState(false)
    const [openNofity, setOpenNotify] = useState(false)
    const [cookies] = useCookies(['user']);
    const [user, setUser] = useState([])

    return <AppContext.Provider value={
        {activeMenu, setActiveMenu,
             openSearch, setOpenSearch,
            openNofity, setOpenNotify, user, setUser}
        }>
        {children}
    </AppContext.Provider>
}

export default AppProvider