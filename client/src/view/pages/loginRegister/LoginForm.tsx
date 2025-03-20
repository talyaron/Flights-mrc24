import React, { useState } from 'react';
import styles from './LoginRegister.module.scss';
import Modal from '../Home/Modal';
import { useNavigate } from 'react-router';


const LoginForm = ({ show, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const res = await response.json();
            console.log('Login successful:', res);

            // Clear form fields
            setEmail('');
            setPassword('');

            if(res.role === 'Admin' || res.role === 'Sysadmin' || res.role === 'Employee'){
                navigate('/company');
              }
            else{
                navigate('/home');
            }
            // Notify parent component
            onLoginSuccess();
            onClose();
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Login failed - incorrect email or password');
        }
    };

    // Reset form when modal is closed
    const handleClose = () => {
        setEmail('');
        setPassword('');
        setLoginError('');
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <h2 className={styles['modal-title']}>Log in</h2>
            {loginError && <div className={styles['error-message']}>{loginError}</div>}

            <form onSubmit={handleLoginSubmit} className={styles['simple-form']}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Log in</button>
            </form>
        </Modal>
    );
};

export default LoginForm;