export const checkSession = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.ok; // Returns true if session is valid
    } catch (error) {
        console.error('Session check failed:', error);
        return false;
    }
};

