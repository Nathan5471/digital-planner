import React, { useState } from 'react';
import { register } from '../utils/AuthAPIHandler';

export function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            email,
            password,
        }
        await register(userData);
        setUsername('');
        setEmail('');
        setPassword('');
        window.location.href = '/';
    }

    return (
        <form className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800  dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            <input
                type="text"
                placeholder="Username"
                className="mb-4 p-2 border dark:bg-gray-700 border-gray-300 dark:border-gray-700 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                className="mb-4 p-2 border dark:bg-gray-700 border-gray-300 dark:border-gray-700 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="mb-4 p-2 border dark:bg-gray-700 border-gray-300 dark:border-gray-700 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSignup}>Sign Up</button>
            <p className="mt-4">
                Already have an account? <a href="/login" className="text-blue-500">Login</a>
            </p>
        </form>
    );
}