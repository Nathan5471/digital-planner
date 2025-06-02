import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from './AuthAPIHandler';

export function AuthenticatedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await getCurrentUser();
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
            }
        }
        checkAuthentication();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // or a loading spinner
    }
    return isAuthenticated === true ? <Outlet /> : <Navigate to="/login"/>;
}