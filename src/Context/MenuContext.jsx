import { createContext, useState, useContext } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [persona, setPersona] = useState(null);
    const [sistemas, setSistemas] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dashboard, setDashboard] = useState(false);

    return (
        <MenuContext.Provider
            value={{
                persona,
                setPersona,
                sistemas,
                setSistemas,
                error,
                setError,
                loading,
                setLoading,
                dashboard,
                setDashboard,
            }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
