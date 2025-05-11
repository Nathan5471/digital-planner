import axios from 'axios';

const baseURL = 'https://localhost:5000/api/auth';

const register = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

const login = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

const logout = () => {
    // Implement clearing of the authentication token
}

const deleteAccount = async (credentials) => {
    try {
        const response = await axios.delete(`${baseURL}/delete`, { data: credentials });
        return response.data;
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
}

export { register, login, logout, deleteAccount };
