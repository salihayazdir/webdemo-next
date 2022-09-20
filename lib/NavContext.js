import { useState, createContext, useContext } from "react"

export const NavContext = createContext();

export const useNavigation = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
const [navigation, setNavigation] = useState([])

    return (
        <NavContext.Provider value={{ navigation, setNavigation }}>
            {children}
        </NavContext.Provider>
    )
}