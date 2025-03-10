import ProgressBar, { ProgressBarType } from '../../../components/ProgressBar/ProgressBar';
import styles from './../OrderProcess.module.scss';
import { useNavigate } from 'react-router';

const OrderConfirmation = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.homeContainer}>
			<ProgressBar progress={ProgressBarType.OrderConfirmation} />
			<div className={styles.buttonContainer}>
				<button onClick={() => navigate('/home')} className={styles.searchButton}>Order Another Ticket</button>
			</div>
		</div>
	)
}

export default OrderConfirmation