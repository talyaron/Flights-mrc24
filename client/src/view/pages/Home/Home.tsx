import { useState } from 'react';
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

    // Using the query hook
    const { data: flights, isLoading, error } = useSearchFlightsQuery(searchData, {
        // Only run the query when the form is submitted
        skip: !searchData.from || !searchData.to || !searchData.departDate,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // The query will automatically run when searchData changes
        console.log('Searching flights:', searchData);
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
                        <input
                            type="text"
                            placeholder="Departure city"
                           
                            onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>To</label>
                        <input
                            type="text"
                            placeholder="Arrival city"
                          
                            onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label>Depart</label>
                        <input
                            type="date"
                            
                            onChange={(e) => setSearchData({ ...searchData, departDate: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Return</label>
                        <input
                            type="date"
                            
                            onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Passengers</label>
                        <input
                            type="number"
                            min="1"
                            onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <button className={styles.searchButton} type="submit">
                    Search Flights
                </button>
            </form>

            {/* Display results */}
            {isLoading && <div>Loading...</div>}
            {error && <div>Error occurred</div>}
            {flights && (
                <div className={styles.resultsContainer}>
                    {flights.map((flight) => (
                        <div className={styles.flightCard} key={flight.id}>
                            <h3>{flight.from} → {flight.to}</h3>
                            <p>Price: ${flight.price}</p>
                            <p>Departure: {flight.departure_time}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default Home;