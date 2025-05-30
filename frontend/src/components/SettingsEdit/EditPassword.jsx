import React, { useState } from 'react';
import { editUser } from '../../utils/AuthAPIHandler.js';
import { useOverlayContext } from '../../contexts/OverlayContext.jsx';

export function EditPassword() {
    const [newPassword, setNewPassword] = useState('');
    const { closeOverlay } = useOverlayContext();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await editUser('password', { newPassword });
            alert('Password updated successfully');
            closeOverlay()
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred while updating password');
        }
    };

    return (
        <>
            <h2 className="text-lg font-bold mb-4">Edit Email</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border dark:border-gray-700 dark:bg-gray-700 p-2 mb-2 w-full" required />
                <div className="flex justify-between mb-2">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none">Update Password</button>
                    <button type="button" className="bg-red-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 focus:outline-none" onClick={closeOverlay}>Cancel</button>
                </div>
            </form>
        </>
    );
}