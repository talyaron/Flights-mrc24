import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginRegister.module.scss';
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;



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
      const response = await axios.post('/users/login', {
        email: loginData.email,
        password: loginData.password
      });

      console.log('Login successful:', response.data);
      setSuccessMessage('Login successful.!');
      setShowLoginModal(false);

      localStorage.setItem('user', JSON.stringify(response.data.payload));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('loginDate', response.data.date);



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
      const response = await axios.post('/users/register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password
      });

      console.log('Registration successful:', response.data);
      setSuccessMessage('You have successfully registered!');
      setShowSignupModal(false);

      localStorage.setItem('user', JSON.stringify(response.data.payload));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('loginDate', response.data.date);


    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || 'An error occurred during registration.';
      setRegisterError(errorMessage === 'User already exists' ? 'User with this email already exists' : errorMessage);
    }
  };


  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <button
            onClick={onClose}
            className="close-button"
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
    <div className="login-register-container">
      {successMessage && (
        <div className="success-message">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>✕</button>
        </div>
      )}

      {isLoggedIn ? (
        <div className="user-logged-in">
          <p>  You are logged in</p>
          <button onClick={handleLogout} className="logout-button">
            Disconnect
          </button>
        </div>
      ) : (
        <div className="buttons-container">
          <button
            onClick={() => setShowLoginModal(true)}
            className="login-button"
          >
            Log in
          </button>

          <button
            onClick={() => setShowSignupModal(true)}
            className="signup-button"
          >
            Register
          </button>
        </div>
      )}


      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2 className="modal-title">Log in</h2>
        {loginError && <div className="error-message">{loginError}</div>}
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit" className="submit-button login-submit">
            Log in
          </button>
        </form>
      </Modal>

      <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <h2 className="modal-title">Register</h2>
        {registerError && <div className="error-message">{registerError}</div>}
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label>User name</label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password verification</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />
          </div>
          <button type="submit" className="submit-button signup-submit">
            Register
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginRegister;

