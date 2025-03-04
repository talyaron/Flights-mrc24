import { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import { useGetFetchDataQuery, useSearchFlightsQuery, useFetchDataQuery } from '../../../services/fetchData';
import { resetFlights, updateFlights } from '../../../store/slices/flightsResultsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import airports from 'airports';


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        passengers: 1
    });

    const { data: flights, isLoading, error } = useSearchFlightsQuery(searchData, {
        skip: !searchData.from || !searchData.to || !searchData.departDate || !searchData.returnDate || !searchData.passengers,
    });
    const { data: flightDestinations } = useGetFetchDataQuery('/flights/flight-destinations');
    const { data: flightOrigin } = useFetchDataQuery({ url: '/flights/flight-origin' });
    const [airportNames, setAirportNames] = useState<{ origins: Record<string, string>; destinations: Record<string, string> }[]>([]);
    const [origins, setOrigin] = useState<{name:string, code:string}>([])
    const [destinations, setDestinations] = useState<{name:string, code:string}>([])


    const handleSubmit = (e: React.FormEvent) => {
        console.log(flights)
        e.preventDefault();
        // dispatch(resetFlights());
        dispatch(updateFlights(flights!));
        navigate('/flight-search-results');
    };


    useEffect(() => {
        const destinationsData: string[] = flightDestinations?.map((destination: any) => destination.destination);
        const originsData: string[] = flightOrigin?.map((origin: any) => origin.origin);

        // Get city names from airport data
        const getAirportNames = (list: any[]) => {
            const airportNames = list?.map((code: string) => {
                const airport = airports.find((airport) => airport.iata === code);
                return airport ? { name: airport.name?.replace('International Airport', '').trim(), code: airport.iata }
                    : { name: code, code: code };
            });
            return airportNames;
        }

        setOrigin(getAirportNames(originsData));
        setDestinations(getAirportNames(destinationsData));

    }, [flightDestinations, flightOrigin]);

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
                            {origins && Object.keys(origins).length > 0 ? (
                                Object.entries(origins).map(([index, item]) => (
                                    <option key={item.code!.toString()} value={item.code!.toString()}>
                                        {item.name!.toString()} ({item.code!.toString()})
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No origins found</option>
                            )}

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
                            {destinations && Object.keys(destinations).length > 0 ? (
                                Object.entries(destinations).map(([index, item]) => (
                                    <option key={item.code!.toString()} value={item.code!.toString()}>
                                        {item.name!.toString()} ({item.code!.toString()})
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No origins found</option>
                            )}
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

        </div>
    );
};

export default Home;

function getFetchData(arg0: string): { data: any; } {
    throw new Error('Function not implemented.');
}

