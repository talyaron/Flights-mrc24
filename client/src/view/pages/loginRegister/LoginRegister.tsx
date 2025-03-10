import React, { useState } from 'react';
import styles from './LoginRegister.module.scss';

const LoginRegister = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

      const data = await response.json();
      console.log('Login successful:', data);
      
      setIsLoggedIn(true);
      setSuccessMessage('Login successful!');
      setShowLoginModal(false);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed - incorrect email or password');
    }
  };

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
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      
      setIsLoggedIn(true);
      setSuccessMessage('You have successfully registered!');
      setShowSignupModal(false);
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError(error.message || 'An error occurred during registration.');
    }
  };

  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
      <div className={styles['modal-overlay']}>
        <div className={styles['modal-container']}>
          <button onClick={onClose} className={styles['close-button']}>✕</button>
          {children}
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSuccessMessage('Disconnection');
  };

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
          <button onClick={() => setShowLoginModal(true)} className={styles['login-button']}>
            Log in
          </button>
          <button onClick={() => setShowSignupModal(true)} className={styles['signup-button']}>
            Register
          </button>
        </div>
      )}

      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
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

      <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
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
    </div>
  );
};

export default LoginRegister;