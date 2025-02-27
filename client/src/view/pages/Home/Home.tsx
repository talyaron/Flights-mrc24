import { useState } from 'react';
import styles from './Home.module.scss';

const Home = () => {
    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        passengers: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Search data:', searchData);
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
                            value={searchData.from}
                            onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>To</label>
                        <input
                            type="text"
                            placeholder="Arrival city"
                            value={searchData.to}
                            onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label>Depart</label>
                        <input
                            type="date"
                            value={searchData.departDate}
                            onChange={(e) => setSearchData({ ...searchData, departDate: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Return</label>
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
                            value={searchData.passengers}
                            onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <button className={styles.searchButton} type="submit">
                    Search Flights
                </button>
            </form>
        </div>
    );
};

export default Home;