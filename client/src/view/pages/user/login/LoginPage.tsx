import { useLoginViewModel } from './loginVM';
import { Link, useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import styles from './Login.module.scss';
import { Modal } from '../../../components/Modal/Modal';
import { checkToken } from '../../../../services/checkToken';
import { useSelector } from 'react-redux';
import { flightDetails } from '../../../../store/slices/bookFlightSlice';

const LoginPage: React.FC = () => {
  const { handleSubmit, error } = useLoginViewModel();
  const navigate = useNavigate();
  const flight = useSelector(flightDetails);

  useEffect(() => {
    const checkValidToken = checkToken();

    if (checkValidToken) {
      if (flight.flightId) {
        navigate(`/booking/${flight.flightId}`);
      }
      else {
        navigate('/home');
      }
    }
  }, [handleSubmit, flight.flightId, navigate]);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const loginForm = (
    <div className={styles.loginContainer}>
      <h1>Welcome Back</h1>
      <p className={styles.subtitle}>Please enter your details to sign in</p>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name='email'
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name='password'
            placeholder="••••••••"
            required
          />
        </div>

        <div className={styles.formOptions}>
          <label className={styles.remember}>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className={styles.forgotPassword}>
            Forgot password?
          </Link>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.loginButton}>
            Sign in
          </button>
          <Link to="/user/register" className={styles.registerButton} style={{ height: "100%", width: "93%" }}>
            Create account
          </Link>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );

  return (
    <Modal show={true} onClose={handleClose}>
      {loginForm}
    </Modal>
  );
};

export default LoginPage;
