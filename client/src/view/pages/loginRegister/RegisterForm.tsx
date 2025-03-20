import React, { useState,  } from 'react';
import styles from './LoginRegister.module.scss';
import Modal from '../Home/Modal';
import { setUserDetails } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


const RegisterForm = ({ show, onClose, onRegisterSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterError('');

        if (password !== confirmPassword) {
            setRegisterError('The passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    role: 'Employee'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const res = await response.json();
            console.log('Registration successful:', res);
            const data = {
                userName: res.payload.username,
                email: res.payload.email,
                role: res.payload.role,
                date: res.date.toString(),
                userId: res.payload.userId,
                isAuthenticated: true,
                token: res.token
              }
              dispatch(setUserDetails(data));
              navigate('/company');

            // Clear form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Notify parent component
            onRegisterSuccess();
            onClose();
        } catch (error) {
            console.error('Registration error:', error);
            setRegisterError(error.message || 'An error occurred during registration.');
        }
    };

    // Reset form when modal is closed
    const handleClose = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRegisterError('');
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <h2 className={styles['modal-title']}>Register</h2>
            {registerError && <div className={styles['error-message']}>{registerError}</div>}

            <form onSubmit={handleRegisterSubmit} className={styles['simple-form']}>
                <label>User name:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

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

                <label>Password verification:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </Modal>
    );
};

export default RegisterForm;