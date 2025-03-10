import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleCustomerClick = () => {
        navigate('/customers');
    };

    const handleEmployeeClick = () => {
        navigate('/employees');
    };

    return (
        <div className={styles.landingContainer}>
            <div className={styles.welcomeSection}>
                <h1>Welcome to Flight Booking System</h1>
                <p>Please select how you want to proceed</p>
            </div>

            <div className={styles.optionsContainer}>
                <div className={styles.optionCard}>
                    <h2>I am a Customer</h2>
                    <p>Search for flights, book tickets, manage your bookings</p>
                    <button
                        className={styles.customerButton}
                        onClick={handleCustomerClick}
                    >
                        Enter as Customer
                    </button>
                </div>

                <div className={styles.optionCard}>
                    <h2>I am an Employee</h2>
                    <p>Manage flights, handle operations, access admin panel</p>
                    <button
                        className={styles.employeeButton}
                        onClick={handleEmployeeClick}
                    >
                        Enter as Employee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;