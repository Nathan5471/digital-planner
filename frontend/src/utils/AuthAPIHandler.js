import axios from 'axios';

const baseURL = 'https://6762-24-149-102-194.ngrok-free.app/api/auth';
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

const getUserDarkMode = async () => {
    try {
        const response = await api.get('/darkmode', { headers: { 'ngrok-skip-browser-warning': 'any' } });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('You are not logged in!')
        } else {
            throw new Error('An error occurred while fetching user dark mode preference');
        }
    }
}

const setUserDarkMode = async (darkMode) => {
    try {
        const response = await api.post('/darkmode', { darkMode }, { headers: { 'ngrok-skip-browser-warning': 'any' } });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('You are not logged in! (Redirecting you to login page)');
            window.location.href = '/login';
        } else {
            alert('An error occurred while setting user dark mode preference');
        }
    }
}

export { register, login, logout, getCurrentUser, deleteAccount, getUserDarkMode, setUserDarkMode };
