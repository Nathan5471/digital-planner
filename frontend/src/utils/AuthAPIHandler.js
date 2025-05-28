import axios from 'axios';

const baseURL = 'https://1489-24-149-102-194.ngrok-free.app/api/auth';
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

export { register, login, logout, deleteAccount };
