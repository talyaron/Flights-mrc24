import { useNavigate } from 'react-router';
import ProgressBar, { ProgressBarType } from '../../../components/ProgressBar/ProgressBar';
import SeatSelection from '../../../components/SeatSelection/SeatSelection';
import styles from './../OrderProcess.module.scss';
import { useState } from 'react';

const PassengersDetails = () => {
	const navigate = useNavigate();
	const [searchData, setSearchData] = useState({
		name: '',
		passportNumber: '',
	});

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchData({ ...searchData, name: e.target.value });
	};

	const handlePassportNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchData({ ...searchData, passportNumber: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		navigate('/order-confirmation');
	};

	return (
		<div className={styles.homeContainer}>
			<ProgressBar progress={ProgressBarType.PassengersDetails} />
			<form className={styles.searchForm} onSubmit={handleSubmit}>
				<div className={styles.inputGroup}>
					<div className={styles.inputWrapper}>
						<label>Name</label>
						<input
							type="text"
							value={searchData.name}
							onChange={handleNameChange}
							required
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label>Passport number</label>
						<input
							type="text"
							value={searchData.passportNumber}
							onChange={handlePassportNumberChange}
							required
						/>
					</div>
				</div>
				<SeatSelection />
				<div className={styles.buttonContainer}>
					<button onClick={() => navigate(-1)} className={styles.searchButton}>
						Back
					</button>
					<button className={styles.searchButton} type="submit">
						Pay
					</button>
				</div>
			</form>
		</div>
	);
};

export default PassengersDetails;