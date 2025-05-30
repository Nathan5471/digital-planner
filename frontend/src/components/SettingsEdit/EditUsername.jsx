import React, { useState } from 'react';
import { editUser } from '../../utils/AuthAPIHandler.js';
import { useOverlayContext } from '../../contexts/OverlayContext.jsx';

export function EditUsername() {
    const [newUsername, setNewUsername] = useState('');
    const { closeOverlay } = useOverlayContext();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await editUser('username', { newUsername });
            alert('Username updated successfully');
            closeOverlay()
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred while updating username');
        }
    };

    return (
                <>
            <h2 className="text-lg font-bold mb-4">Edit Username</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" placeholder="New Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border dark:border-gray-700 dark:bg-gray-700 p-2 mb-2 w-full" required />
                <div className="flex justify-between mb-2">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none">Update Username</button>
                    <button type="button" className="bg-red-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 focus:outline-none" onClick={closeOverlay}>Cancel</button>
                </div>
            </form>
        </>
    );
}