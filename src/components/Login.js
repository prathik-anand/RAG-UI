import React, { useState } from 'react';
import './Auth.css';

const Login = ({ setIsLoggedIn, toggleRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const apiUrl = `${process.env.REACT_APP_AUTH_SERVICE_URL}/login`; // Use the full API URL
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            setIsLoggedIn(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleLogin} className="form">
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="submit-button">Login</button>
                {error && <div className="error-message">{error}</div>}
                <p>
                    If you don't have an account,{' '}
                    <span className="link" onClick={toggleRegister}>click here to create</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
