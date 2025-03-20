import React, { useEffect, useState } from 'react';
import styles from './LoginRegister.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { checkToken } from '../../../services/checkToken';
import { useNavigate } from 'react-router';


const LoginRegisterPassengers = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setSuccessMessage('Login successful!');
    };

    const handleRegisterSuccess = () => {
        setIsLoggedIn(true);
        setSuccessMessage('You have successfully registered!');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setSuccessMessage('Disconnection');
    };

    useEffect(() => {
        const checkValidToken = checkToken();
        if (checkValidToken) {
            setIsLoggedIn(true);
            navigate('/home');
        }
        
    }, []);

    return (
        <div className={styles['login-register-container']}>
            {successMessage && (
                <div className={styles['success-message']}>
                    {successMessage}
                    <button onClick={() => setSuccessMessage('')}>✕</button>
                </div>
            )}

            {isLoggedIn ? (
                <div className={styles['user-logged-in']}>
                    <p>You are logged in</p>
                    <button onClick={handleLogout} className={styles['logout-button']}>
                        Disconnect
                    </button>
                </div>
            ) : (
                <div className={styles['buttons-container']}>
                    <button
                        onClick={() => {
                            setShowSignupModal(false); // Close signup modal if open
                            setShowLoginModal(true);
                        }}
                        className={styles['login-button']}
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => {
                            setShowLoginModal(false); // Close login modal if open
                            setShowSignupModal(true);
                        }}
                        className={styles['signup-button']}
                    >
                        Register
                    </button>
                </div>
            )}

            <LoginForm
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />

            <RegisterForm
                show={showSignupModal}
                onClose={() => setShowSignupModal(false)}
                onRegisterSuccess={handleRegisterSuccess}
            />
        </div>
    );
};

export default LoginRegisterPassengers;