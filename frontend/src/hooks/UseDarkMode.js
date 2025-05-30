import { useState, useEffect } from 'react';
import { getUserDarkMode, setUserDarkMode } from '../utils/AuthAPIHandler.js';

export function useDarkMode() {
    console.log("useDarkMode hook initialized");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const fetchDarkModePreference = async () => {
            try {
                const response = await getUserDarkMode();
                setIsDarkMode(response.darkMode);
            } catch (error) {
                console.error("Error fetching dark mode preference:", error);
                setIsDarkMode(true);
            }
        }
        fetchDarkModePreference();
    }, []);

    const toggleDarkMode = async () => {
        try {
            const newDarkModePreference = !isDarkMode;
            setIsDarkMode(newDarkModePreference);
            await setUserDarkMode(newDarkModePreference);
        } catch (error) {
            console.error("Error setting dark mode preference:", error);
        }
    }

    return {
        isDarkMode,
        toggleDarkMode
    };
}