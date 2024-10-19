import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = ({ setIsLoggedIn }) => {
    const [showRegister, setShowRegister] = useState(false);

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    return (
        <div>
            {showRegister ? (
                <Register />
            ) : (
                <Login setIsLoggedIn={setIsLoggedIn} toggleRegister={toggleRegister} />
            )}
        </div>
    );
};

export default Auth;
