import { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import { useSearchFlightsQuery } from '../../../services/fetchData';

const Home = () => {
    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        passengers: 1
    });

    const { data: flights, isLoading, error } = useSearchFlightsQuery(searchData, {
        skip: !searchData.from || !searchData.to || !searchData.departDate,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with:', searchData);
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <h1>Find Your Perfect Flight</h1>
                <p>Search hundreds of airlines and destinations</p>
            </div>

            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label>From</label>
                        <select
                            value={searchData.from}
                            onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                            required
                        >
                            <option value="">Select Origin</option>
                            <option value="JFK">New York (JFK)</option>
                            <option value="LAX">Los Angeles (LAX)</option>
                            <option value="ORD">Chicago (ORD)</option>
                            <option value="MIA">Miami (MIA)</option>
                            {/* Add more airports as needed */}
                        </select>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>To</label>
                        <select
                            value={searchData.to}
                            onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                            required
                        >
                            <option value="">Select Destination</option>
                            <option value="JFK">New York (JFK)</option>
                            <option value="LAX">Los Angeles (LAX)</option>
                            <option value="ORD">Chicago (ORD)</option>
                            <option value="MIA">Miami (MIA)</option>
                            {/* Add more airports as needed */}
                        </select>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label>Depart</label>
                        <input
                            type="date"
                            value={searchData.departDate}
                            onChange={(e) => setSearchData({ ...searchData, departDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Return (Optional)</label>
                        <input
                            type="date"
                            value={searchData.returnDate}
                            onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Passengers</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={searchData.passengers}
                            onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <button className={styles.searchButton} type="submit">
                    Search Flights
                </button>
            </form>

            {isLoading && <div className={styles.loadingSpinner}>Searching for flights...</div>}
            {error && <div className={styles.errorMessage}>Error: {error.toString()}</div>}
            
            {flights && flights.length > 0 ? (
                <div className={styles.resultsContainer}>
                    {flights.map((flight) => (
                        <div className={styles.flightCard} key={flight.flight_id}>
                            <div className={styles.flightHeader}>
                                <h3>{flight.origin} → {flight.destination}</h3>
                                <span className={styles.price}>${flight.price}</span>
                            </div>
                            <div className={styles.flightDetails}>
                                <p>Date: {new Date(flight.departure_date).toLocaleDateString()}</p>
                                <p>Departure: {flight.departure_time}</p>
                                <p>Arrival: {flight.arrival_time}</p>
                            </div>
                            <button className={styles.bookButton}>Book Now</button>
                        </div>
                    ))}
                </div>
            ) : flights && (
                <div className={styles.noResults}>No flights found for your search criteria</div>
            )}
        </div>
    );
};

export default Home;