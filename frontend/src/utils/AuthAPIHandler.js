import axios from 'axios';

const baseURL = 'https://8622-184-170-66-26.ngrok-free.app/api/auth';
const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        if (response.status === 201) {
            return response.data;
        }
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
        const response = await api.post('/', credentials);
        if (response.status === 200) {
            return response.data;
        }
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

const getCurrentUser = async () => {
    try {
        const response = await api.get('/', { headers: { 'ngrok-skip-browser-warning': 'any' } });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('You are not logged in! (Redirecting you to login page)');
            window.location.href = '/login';
        } else {
            alert('An error occurred while fetching the current user');
        }
    }
}

const deleteAccount = async (credentials) => {
    try {
        const response = await axios.delete(`${baseURL}/delete`, { data: credentials });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        alert(error.response || 'An error occurred during registration');
        throw error;
    }
}

export { register, login, logout, getCurrentUser, deleteAccount };
