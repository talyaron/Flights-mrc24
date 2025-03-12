import React, { useState } from "react";
import { register } from "../../../../controllers/auth/users/register";
import styles from "./Register.module.scss"
import { Link, useNavigate } from "react-router";
import { setUserDetails } from "../../../../store/slices/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "../../../components/Modal/Modal";
import { checkToken } from "../../../../services/checkToken";
import { flightDetails } from "../../../../store/slices/bookFlightSlice";

const Register: React.FC = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flight = useSelector(flightDetails);
  console.log(flight)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register({
        username, email, password,
        role: "Passenger"
      });

      console.log("Registration Successful");
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
      if (flight.flightId) {
        navigate(`/booking/${flight.flightId}`);
      }
      else {
        navigate('/home');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setRegisterError(errorMessage);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const registerForm = (
    <div className={styles.registerContainer}>
      <h1>Create Account</h1>
      <p className={styles.subtitle}>Please fill in your details to register</p>

      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.registerButton}>
            Create Account
          </button>
          <Link to="/user/login" className={styles.loginButton} style={{ height: "100%", width: "89%" }}>
            Already have an account? Sign in
          </Link>
        </div>
      </form>
      {registerError && <p className={styles.error}>{registerError}</p>}
    </div>
  );

  return (
    <Modal show={true} onClose={handleClose}>
      {registerForm}
    </Modal>
  );
};

export default Register;

