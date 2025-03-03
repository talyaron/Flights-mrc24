import React, { useState } from 'react';
import styles from './UpdateFlightForm.module.scss';
import { Flight } from "../../../model/flightsModel";

interface UpdateFlightFormProps {
    flight: Flight;
    onSubmit: (flightId: string, updatedData: Partial<Flight>) => void;
    onCancel: () => void;
}

const UpdateFlightForm: React.FC<UpdateFlightFormProps> = ({ flight, onSubmit, onCancel }) => {
    const [updatedFlight, setUpdatedFlight] = useState<Partial<Flight>>({ ...flight });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdatedFlight(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(flight.flight_id.toString(), updatedFlight);
    };

    return (
        <div className={styles.updateFormContainer}>
            <h2>Update Flight</h2>
            <form onSubmit={handleSubmit}>
                <label>Origin:
                    <input type="text" name="origin" value={updatedFlight.origin || ''} onChange={handleChange} />
                </label>
                <label>Destination:
                    <input type="text" name="destination" value={updatedFlight.destination || ''} onChange={handleChange} />
                </label>
                <label>Departure Date:
                    <input type="date" name="departure_date" value={updatedFlight.departure_date || ''} onChange={handleChange} />
                </label>
                <label>Departure Time:
                    <input type="time" name="departure_time" value={updatedFlight.departure_time || ''} onChange={handleChange} />
                </label>
                <label>Arrival Time:
                    <input type="time" name="arrival_time" value={updatedFlight.arrival_time || ''} onChange={handleChange} />
                </label>
                <label>Price:
                    <input type="number" name="price" value={updatedFlight.price || ''} onChange={handleChange} />
                </label>
                <div className={styles.buttonGroup}>
                    <button type="submit" className="button button--success">Update</button>
                    <button type="button" onClick={onCancel} className="button button--danger">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateFlightForm;
