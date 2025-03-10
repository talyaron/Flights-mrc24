import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './BookingDetails.module.scss';
import { useNavigate } from 'react-router';
import { FlightDetailsState, flightDetails } from '../../../store/slices/bookFlightSlice';

const BookingDetails: React.FC = () => {
  const flight = useSelector(flightDetails);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(flight.flight_id);
    // if (!flight || !flight.flightDetails.flight_id) {
    //   navigate('/home');
    // }
  }, [flight, navigate]);

  // If no flight details, return loading state
  if (!flight || !flight.flight_id) {
    return (
      <div className={styles.container}>
        <div className={styles.bookingCard}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    navigate('/payment');
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookingCard}>
        <h1>Booking Details</h1>
        
        <div className={styles.flightHeader}>
          <div className={styles.airline}>
            <h2>{flight.company_name || 'Airline'}</h2>
            <span className={styles.flightNumber}>
              Flight {flight.flight_id || 'N/A'}
            </span>
          </div>
        </div>

        <div className={styles.timeDetails}>
          <div className={styles.departure}>
            <h3>Departure</h3>
            <div className={styles.time}>{flight.departure_time || 'TBD'}</div>
            <div className={styles.date}>{flight.departure_date || 'TBD'}</div>
            <div className={styles.airport}>{flight.origin || 'TBD'}</div>
          </div>

          <div className={styles.divider}>
            <div className={styles.line}></div>
            <div className={styles.arrow}>✈</div>
          </div>

          <div className={styles.arrival}>
            <h3>Arrival</h3>
            <div className={styles.time}>{flight.arrival_time || 'TBD'}</div>
            <div className={styles.date}>{flight.departure_date || 'TBD'}</div>
              <div className={styles.airport}>{flight.destination || 'TBD'}</div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button 
            className={styles.continueButton}
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
