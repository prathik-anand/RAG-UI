// src/components/Register.js
import React, { useState } from 'react';
import './Auth.css'; // Import the CSS file for styling

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState(''); // New field for location
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password) => {
        const lengthValid = password.length >= 8;
        const upperCaseValid = /[A-Z]/.test(password);
        const lowerCaseValid = /[a-z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialCharValid = /[@$!%*?&]/.test(password);

        return {
            lengthValid,
            upperCaseValid,
            lowerCaseValid,
            numberValid,
            specialCharValid,
        };
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validate that password and confirm password match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Validate password strength
        const passwordChecks = validatePassword(password);
        if (!passwordChecks.lengthValid || !passwordChecks.upperCaseValid || !passwordChecks.lowerCaseValid || !passwordChecks.numberValid || !passwordChecks.specialCharValid) {
            setError('Please ensure your password meets all the requirements.');
            return;
        }

        // Use the full API URL
        const apiUrl = `${process.env.REACT_APP_AUTH_SERVICE_URL}/register`; 

        // Debugging: Log the data being sent to the API
        console.log('Registering user with data:', {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            phone_no: phone,
            location,
            country,
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    phone_no: phone,
                    location,
                    country,
                }),
            });

            // Debugging: Check the response status
            console.log('Response status:', response.status);

            if (response.status === 201) { // Check for 201 Created
                alert('Registration successful! You can now log in.'); // Inform the user
                // Removed navigation to login page
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setError(error.message);
            console.error('Registration error:', error); // Log the error for debugging
        }
    };

    const passwordChecks = validatePassword(password);

    return (
        <div className="form-container">
            <form onSubmit={handleRegister} className="form">
                <h2>Register</h2>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone No"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} // New input for location
                    placeholder="Location"
                />
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange} // Use the new handler
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit" className="submit-button">Register</button>
                {error && <div className="error-message">{error}</div>}
                <div className="password-check">
                    <p style={{ color: passwordChecks.lengthValid ? 'green' : 'red' }}>
                        {passwordChecks.lengthValid ? '✔️ At least 8 characters long' : '❌ At least 8 characters long'}
                    </p>
                    <p style={{ color: passwordChecks.upperCaseValid ? 'green' : 'red' }}>
                        {passwordChecks.upperCaseValid ? '✔️ At least one uppercase letter' : '❌ At least one uppercase letter'}
                    </p>
                    <p style={{ color: passwordChecks.lowerCaseValid ? 'green' : 'red' }}>
                        {passwordChecks.lowerCaseValid ? '✔️ At least one lowercase letter' : '❌ At least one lowercase letter'}
                    </p>
                    <p style={{ color: passwordChecks.numberValid ? 'green' : 'red' }}>
                        {passwordChecks.numberValid ? '✔️ At least one number' : '❌ At least one number'}
                    </p>
                    <p style={{ color: passwordChecks.specialCharValid ? 'green' : 'red' }}>
                        {passwordChecks.specialCharValid ? '✔️ At least one special character' : '❌ At least one special character'}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
