import {createContext, useState, useContext} from 'react';

const RefreshContext = createContext();

export const useRefreshContext = () => useContext(RefreshContext);

export const RefreshProvider = ({children}) => {
    const [refreshToggle, setRefreshToggle] = useState(false);

    const triggerRefresh = () => {
        setRefreshToggle((prev) => !prev);
    }

    const contextValue = {
        refreshToggle,
        triggerRefresh
    }

    return <RefreshContext.Provider value={contextValue}>
        {children}
    </RefreshContext.Provider>
}
