import { Flight } from '../../../model/flightsModel';
import { useSelector } from 'react-redux';
import { flightResults } from '../../../store/slices/flightsResultsSlice';
import { useState, useEffect } from 'react';
import styles from './FlightSearchResults.module.scss';
import { useNavigate } from 'react-router';

function FlightSearchResults() {
    const flights = useSelector(flightResults);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const searchData = {
        from: flights?.[0]?.origin || '',
        to: flights?.[0]?.destination || '',
        departDate: flights?.[0]?.departure_date || '',
    };
    console.log(flights)
    useEffect(() => {
        if (flights && flights.length > 0) {
            setTimeout(() => setIsLoading(false), 1000);
        }
    }, [flights]);

    useEffect(() => {
        if (flights.length === 0) {
            setTimeout(() => setIsLoading(false), 1000);
            // navigate('/Home');
        }
    }, []);

    return (
        <div className={styles.searchResultsContainer}>
            <div className={styles.title}>

                <h2>Finding the Best Flights for You</h2>
            </div>
            <div className={styles.resultsHeader}>

                <h2>
                    Flights from <span>{searchData.from}</span> to <span>{searchData.to}</span>
                </h2>
                {flights && (
                    <div className={styles.resultsSummary}>
                        {flights.length} flights found • {searchData.departDate}
                    </div>
                )}
            </div>

            {isLoading && (
                <div className={styles.searchProgress}>
                    <>
                        <div className={styles.progressBar}></div>
                        {isLoading && <div className={styles.loadingSpinner}>Searching for flights...</div>}
                    </>
                </div>
            )}
            {flights.length === 0 ? (
                <div className={styles.noResults}>No flights found for your search criteria</div>
            ) : (<div></div>)}
            <div className={styles.resultsContainer}>
                {error && <div className={styles.errorMessage}>Error: {error}</div>}
                {flights && flights.length > 0 ? (
                    <div className={styles.flightsGrid}>
                        {flights.map((flight) => (
                            <div className={styles.flightCard} key={flight.flight_id}>
                                <div className={styles.airline}>
                                    {flight.company_name} • {flight.model} • Flight {flight.flight_id}
                                </div>
                                <div className={styles.flightHeader}>
                                    <h3>{flight.origin} → {flight.destination}</h3>
                                    <span className={styles.price}>${flight.price}</span>
                                </div>
                                <div className={styles.flightTime}>
                                    <div className={styles.time}>
                                        {flight.departure_time} - {flight.arrival_time}
                                    </div>
                                    <div className={styles.duration}>
                                        Direct Flight
                                    </div>
                                </div>
                                <div className={styles.flightDetails}>
                                    <p>Date: {new Date(flight.departure_date).toLocaleDateString()}</p>
                                </div>
                                <button className={styles.bookButton}>Book Now</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div></div>)}
            </div>
        </div>
    );
}

export default FlightSearchResults;