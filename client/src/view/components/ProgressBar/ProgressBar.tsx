import React from "react";
import styles from "./ProgressBar.module.scss";

export enum ProgressBarType {
	FlightSearchResults = "Flight Search Results",
	FightDetails = "Fight Details",
	PassengersDetails = "Passengers Details",
	OrderConfirmation = "Order Confirmation",
}

interface ProgressBarProps {
	progress: ProgressBarType;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	const steps = Object.values(ProgressBarType);
	const currentStepIndex = steps.indexOf(progress);

	return (
		<div className={styles.progressBar}>
			{steps.map((step, index) => (
				<div key={step} className={styles.stepContainer}>
					<div
						className={
							index <= currentStepIndex ? styles.activeStep : styles.inactiveStep
						}
					>
						{index + 1}
					</div>
					<div className={styles.stepLabel}>{step}</div>
					{index < steps.length - 1 && (
						<div
							className={
								index < currentStepIndex ? styles.activeLine : styles.inactiveLine
							}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export default ProgressBar;
