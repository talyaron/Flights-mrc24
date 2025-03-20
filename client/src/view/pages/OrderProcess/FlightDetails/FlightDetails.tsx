import { useState, useEffect } from 'react';
import { useGetFlightByIdQuery } from '../../../../services/fetchData';
import ProgressBar, { ProgressBarType } from '../../../components/ProgressBar/ProgressBar';
import styles from './../OrderProcess.module.scss';
import { useNavigate, useParams } from 'react-router';
import BookingDetails from '../../BookingDetails/BookingDetails';

const FlightDetails = () => {
	const navigate = useNavigate();
	const { flightId } = useParams<{ flightId: string }>();
	const { data: queryData, isLoading, error } = useGetFlightByIdQuery<{ flight: Flight }>(flightId ?? '');
	const [flightData, setFlightData] = useState(null);

	useEffect(() => {
		if (queryData?.flight) {
			console.log(queryData)
			setFlightData(queryData.flight);
		}
	}, [queryData]);

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
			<BookingDetails />
		</div>
	);
};

export default FlightDetails;