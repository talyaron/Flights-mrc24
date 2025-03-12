import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import styles from './BookingDetails.module.scss';
import { useNavigate } from 'react-router';
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaCalendarAlt } from 'react-icons/fa';

const BookingDetails: React.FC = () => {
  const flight = useSelector((state: RootState) => state.bookFlight);
  const navigate = useNavigate();

  useEffect(() => {
    if (!flight || !flight.flightId) {
      navigate('/home');
    }
  }, [flight, navigate]);

  if (!flight || !flight.flightId) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingCard}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading flight details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.bookingCard}>
        <div className={styles.headerSection}>
          <h1>Flight Booking Details</h1>
          <div className={styles.flightInfo}>
            <span className={styles.airline}>{flight.companyName}</span>
            <span className={styles.flightNumber}>Flight {flight.flightNumber}</span>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.timelineSection}>
            <div className={styles.departure}>
              <div className={styles.icon}>
                <FaPlaneDeparture />
              </div>
              <div className={styles.details}>
                <h3>Departure</h3>
                <div className={styles.location}>{flight.departureAirport}</div>
                <div className={styles.timeGroup}>
                  <span className={styles.time}>
                    <FaClock /> {flight.departureTime}
                  </span>
                  <span className={styles.date}>
                    <FaCalendarAlt /> {flight.departureDate}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.flightPath}>
              <div className={styles.line}></div>
              <div className={styles.plane}>✈</div>
            </div>

            <div className={styles.arrival}>
              <div className={styles.icon}>
                <FaPlaneArrival />
              </div>
              <div className={styles.details}>
                <h3>Arrival</h3>
                <div className={styles.location}>{flight.arrivalAirport}</div>
                <div className={styles.timeGroup}>
                  <span className={styles.time}>
                    <FaClock /> {flight.arrivalTime}
                  </span>
                  <span className={styles.date}>
                    <FaCalendarAlt /> {flight.arrivalDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.summarySection}>
            <h2>Flight Summary</h2>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Airline</span>
                <span className={styles.value}>{flight.companyName}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Flight</span>
                <span className={styles.value}>{flight.flightNumber}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>From</span>
                <span className={styles.value}>{flight.departureAirport}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>To</span>
                <span className={styles.value}>{flight.arrivalAirport}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Back to Search
          </button>
          <button 
            className={styles.continueButton}
            onClick={() => navigate('/payment')}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
