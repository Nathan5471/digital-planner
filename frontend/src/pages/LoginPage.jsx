import React, { useState } from 'react';
import { login } from '../utils/AuthAPIHandler';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            password,
        }
        await login(userData);
        setUsername('');
        setPassword('');
        alert('Login successful! Redirecting to home page...');
        window.location.href = '/';
    }
    return (
        <form className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input
                type="text"
                placeholder="Username"
                className="mb-4 p-2 border border-gray-300 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="mb-4 p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>Login</button>
            <p className="mt-4">
                Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
            </p>
        </form>
    );
}