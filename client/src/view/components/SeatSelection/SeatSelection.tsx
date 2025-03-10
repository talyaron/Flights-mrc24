import React, { useState } from "react";
import styles from "./SeatSelection.module.scss";

const rows = 10;
const cols = 6;
const seatLetters = ["A", "B", "C", "D", "E", "F"];

const SeatSelection: React.FC = () => {
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

	const toggleSeat = (seat: string) => {
		setSelectedSeats((prev) =>
			prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
		);
	};

	return (
		<div className={styles.seatSelection}>
			<h2>Select Your Seat</h2>
			<div className={styles.airplane}>
				{Array.from({ length: rows }).map((_, rowIdx) => (
					<div key={rowIdx} className={styles.row}>
						{seatLetters.map((letter, colIdx) => {
							const seat = `${rowIdx + 1}${letter}`;
							return (
								<div
									key={seat}
									className={`${styles.seat} ${selectedSeats.includes(seat) ? styles.selected : ""
										}`}
									onClick={() => toggleSeat(seat)}
								>
									{seat}
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};

export default SeatSelection;
