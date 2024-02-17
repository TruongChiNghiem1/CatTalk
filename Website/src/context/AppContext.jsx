import { createContext, useState } from "react";

export const AppContext = createContext()
const AppProvider = ({children}) =>{
    const [activeMenu, setActiveMenu] = useState('home')
    const [openSearch, setOpenSearch] = useState(false)
    const [openNofity, setOpenNotify] = useState(false)
    return <AppContext.Provider value={
        {activeMenu, setActiveMenu,
             openSearch, setOpenSearch,
            openNofity, setOpenNotify}
        }>
        {children}
    </AppContext.Provider>
}

export default AppProvider