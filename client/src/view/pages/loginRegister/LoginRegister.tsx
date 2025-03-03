import  { useState, useEffect } from 'react';
import styles from './LoginRegister.module.scss';


const API_BASE_URL = 'http://localhost:3000/api';


const fetchWithCredentials = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  };


    const response = await fetch(`${API_BASE_URL}${endpoint}`, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
    console.error('Error:', data);
    throw new Error(data);
    }

    return data;
 
};

const LoginRegister = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      setIsLoggedIn(true);
      setSuccessMessage('Welcome back');
    }
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const responseData = await fetchWithCredentials('/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      console.log('Login successful:', responseData);
      setSuccessMessage('Login successful.!');
      setShowLoginModal(false);

      localStorage.setItem('user', JSON.stringify(responseData.payload));
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('loginDate', responseData.date);

    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.response?.data?.error || 'Login failed - incorrect email or password');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('The passwords do not match');
      return;
    }

    try {
      const responseData = await fetchWithCredentials('/users/register', {
        method: 'POST',
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password
        })
      });

      console.log('Registration successful:', responseData);
      setSuccessMessage('You have successfully registered!');
      setShowSignupModal(false);

      localStorage.setItem('user', JSON.stringify(responseData.payload));
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('loginDate', responseData.date);

    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || 'An error occurred during registration.';
      setRegisterError(errorMessage === 'User already exists' ? 'User with this email already exists' : errorMessage);
    }
  };

  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
      <div className={styles['modal-overlay']}>
        <div className={styles['modal-container']}>
          <button
            onClick={onClose}
            className={styles['close-button']}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginDate');
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
          <button
            onClick={() => setShowLoginModal(true)}
            className={styles['login-button']}
          >
            Log in
          </button>

          <button
            onClick={() => setShowSignupModal(true)}
            className={styles['signup-button']}
          >
            Register
          </button>
        </div>
      )}

      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2 className={styles['modal-title']}>Log in</h2>
        {loginError && <div className={styles['error-message']}>{loginError}</div>}
        <form onSubmit={handleLoginSubmit}>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit" className={`${styles['submit-button']} ${styles['login-submit']}`}>
            Log in
          </button>
        </form>
      </Modal>

      <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <h2 className={styles['modal-title']}>Register</h2>
        {registerError && <div className={styles['error-message']}>{registerError}</div>}
        <form onSubmit={handleRegisterSubmit}>
          <div className={styles['form-group']}>
            <label>User name</label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>Password verification</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <button type="submit" className={`${styles['submit-button']} ${styles['signup-submit']}`}>
            Register
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginRegister;