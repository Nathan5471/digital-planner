import axios from 'axios';

const baseURL = 'http://localhost:5000/api/auth';

const register = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/register`, userData);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('Invalid username or password');
        } else {
            alert('An error occurred during login');
        }
    }
}

const login = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}`, credentials);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('Invalid username or password');
        } else {
            alert('An error occurred during login');
        }
    }
}

const logout = () => {
    // Implement clearing of the authentication token
}

const deleteAccount = async (credentials) => {
    try {
        const response = await axios.delete(`${baseURL}/delete`, { data: credentials });
        return response;
    } catch (error) {
        alert(error.response || 'An error occurred during registration');
        throw error;
    }
}

export { register, login, logout, deleteAccount };
