import { useState, useEffect } from 'react';
import { useGetFlightByIdQuery } from '../../../../services/fetchData';
import ProgressBar, { ProgressBarType } from '../../../components/ProgressBar/ProgressBar';
import styles from './../OrderProcess.module.scss';
import { useNavigate, useParams } from 'react-router';

const FlightDetails = () => {
	const navigate = useNavigate();
	const { flightId } = useParams<{ flightId: string }>();
	const { data: queryData, isLoading, error } = useGetFlightByIdQuery(flightId || '');
	const [flightData, setFlightData] = useState(null);

	useEffect(() => {
		if (queryData) {
			setFlightData(queryData.flight);
		}
	}, [queryData.flight]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading flight details</div>;
	}

	if (!flightData) {
		return null;
	}

	return (
		<div className={styles.homeContainer}>
			<ProgressBar progress={ProgressBarType.FightDetails} />

			<div className={styles.heroSection}>
				<h1>Details of the flight</h1>
			</div>

			<div className={styles.flightDetailsContainer}>
				<div className={styles.flightDetails}>
					<div className={styles.flightDetail}>
						<div className={styles.flightDetailLabel}>Flight Number:</div>
						<div className={styles.flightDetailValue}>{flightData.flight_id || 'N/A'}</div>
					</div>
					<div className={styles.flightDetail}>
						<div className={styles.flightDetailLabel}>Departure Date:</div>
						<div className={styles.flightDetailValue}>{flightData.departure_date || 'N/A'}</div>
					</div>
					<div className={styles.flightDetail}>
						<div className={styles.flightDetailLabel}>Departure Time:</div>
						<div className={styles.flightDetailValue}>{flightData.departure_time || 'N/A'}</div>
					</div>
					<div className={styles.flightDetail}>
						<div className={styles.flightDetailLabel}>Arrival Time:</div>
						<div className={styles.flightDetailValue}>{flightData.arrival_time || 'N/A'}</div>
					</div>
					<div className={styles.flightDetail}>
						<div className={styles.flightDetailLabel}>Price:</div>
						<div className={styles.flightDetailValue}>{flightData.price || 'N/A'}</div>
					</div>
				</div>
			</div>

			<div className={styles.buttonContainer}>
				<button onClick={() => navigate(-1)} className={styles.searchButton}>
					Back
				</button>
				<button onClick={() => navigate(`/passenger-details`)} className={styles.searchButton}>
					Book Now
				</button>
			</div>
		</div>
	);
};

export default FlightDetails;