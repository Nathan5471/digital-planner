import axios from 'axios';

const baseURL = 'https://gaxfak-ip-184-170-66-25.tunnelmole.net/api/auth';
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

const editUser = async (editOption, newData) => {
    try {
        const response = await api.put(`/${editOption}`, newData);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('You are not logged in! (Redirecting you to login page)');
            window.location.href = '/login';
        } else if (error.response && error.response.status === 404) {
            alert('User not found');
        } else {
            alert('An error occurred while editing the user');
        }
    }
}

const logout = async () => {
    try {
        const response = await api.post('/logout');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Logout error:', error);
        if (error.response && error.response.status === 401) {
            alert('You are not logged in!');
        } else {
            alert('An error occurred during logout');
        }
    }
}

const getCurrentUser = async () => {
    try {
        const response = await api.get('/', { headers: { 'X-Pinggy-No-Screen': 'any' } });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('You are not logged in!');
        } else {
            alert('An error occurred while fetching the current user');
        }
    }
}

const deleteAccount = async () => {
    try {
        const response = await api.delete('/');
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
        const response = await api.get('/darkmode', { headers: { 'X-Pinggy-No-Screen': 'any' } });
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
        const response = await api.post('/darkmode', { darkMode });
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

export { register, login, editUser, logout, getCurrentUser, deleteAccount, getUserDarkMode, setUserDarkMode };
