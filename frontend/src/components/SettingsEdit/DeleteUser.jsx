import React from 'react';
import { deleteAccount } from '../../utils/AuthAPIHandler';
import { useOverlayContext } from '../../contexts/OverlayContext.jsx';

export function DeleteUser() {
    const { closeOverlay } = useOverlayContext();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteAccount();
            alert('Account deleted successfully');
            closeOverlay();
            window.location.href = '/login';
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Wrong password. Please try again.');
            } else {
                console.error('Error deleting account:', error);
                alert('An error occurred while deleting the account. Please try again later.');
            }
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
            <p className="text-red-500 mb-4">This action cannot be undone.</p>
            <div className="flex justify-between">
                <button type="button" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDelete}>Delete Account</button>
                <button type="button" onClick={closeOverlay} className="bg-blue-500 text-white p-2 rounded transform transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none">Cancel</button>
            </div>
        </div>
    );
}