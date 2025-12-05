// Utility function to check if token is valid/existing
export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    
    // In a real implementation, you might decode the JWT token to check its expiration
    // For now, we'll just check if the token exists and isn't empty
    return token !== null && token !== undefined && token !== '';
};

// Utility function to clear auth token
export const clearAuthToken = () => {
    localStorage.removeItem('token');
};