import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/AuthAPIHandler.js";
import { useOverlayContext } from "../contexts/OverlayContext.jsx";
import { EditUsername } from "../components/SettingsEdit/EditUsername.jsx";
import { EditEmail } from "../components/SettingsEdit/EditEmail.jsx";
import { EditPassword } from "../components/SettingsEdit/EditPassword.jsx";

export function SettingsPage({ toggleDarkMode }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { openOverlay } = useOverlayContext();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleEditUsername = (e) => {
        e.preventDefault();
        openOverlay(<EditUsername />);
    }

    const handleEditEmail = (e) => {
        e.preventDefault();
        openOverlay(<EditEmail />);
    }

    const handleEditPassword = (e) => {
        e.preventDefault();
        openOverlay(<EditPassword />);
    }

    const handleToggleDarkMode = (e) => {
        e.preventDefault();
        toggleDarkMode();
    }

    return (
        loading === true ? (
            <div className="bg-gray-100 dark:bg-gray-700 flex justify-center items-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        ) : (
            <div className="flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-white items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mt-2 mb-4">Settings</h1>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-96">
                    <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                    <hr></hr>
                    <div className="mt-4 flex flex-row justify-between items-center">
                        <p className="text-lg">Username: {user.username}</p>
                        <button className="bg-blue-500 text-white text-lg p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none" onClick={handleEditUsername}>Edit</button>
                    </div>
                    <div className="mt-4 flex flex-row justify-between items-center">
                        <p className="text-lg">Email: {user.email}</p>
                        <button className="bg-blue-500 text-white text-lg p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none" onClick={handleEditEmail}>Edit</button>
                    </div>
                    <div className="mt-4 w-full items-center">
                        <button className="w-full bg-blue-500 text-white text-lg p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none" onClick={handleEditPassword}>Update Password</button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-96 mt-6">
                    <h2 className="text-xl font-semibold mb-4">User Preferences</h2>
                    <hr></hr>
                    <div className="mt-4 w-full items-center">
                        <button className="w-full bg-blue-500 text-white text-lg p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none" onClick={handleToggleDarkMode}>Toggle Theme</button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-96 mt-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Account Management</h2>
                    <hr></hr>
                    <div className="mt-4 w-full items-center">
                        <button className="w-full bg-blue-500 text-white text-lg p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none">Log Out</button>
                        </div>
                    <div className="mt-4 w-full items-center">
                        <button className="w-full bg-red-500 text-white text-lg p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 focus:outline-none">Delete Account</button>
                    </div>
                </div>
            </div>
        )
    )
}