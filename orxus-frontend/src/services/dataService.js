import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle 401 errors
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Clear the invalid token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login'; // or you could use useNavigate hook in components
        }
        return Promise.reject(error);
    }
);

export default {
    getProjects() {
        return apiClient.get('/projects');
    },
    getTasks() {
        return apiClient.get('/tasks');
    }
};
