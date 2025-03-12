import { useState } from 'react';
import styles from './SetFlights.module.scss';

interface AddFlightFormProps {
  onSubmit: (flightData: {
    departure_date: string;
    departure_time: string;
    arrival_time: string;
    price: number;
    origin: string;
    destination: string;
    airplane_id: number;
  }) => void;
  onCancel: () => void;
}

const AddFlightForm = ({ onSubmit, onCancel }: AddFlightFormProps) => {
  const [formData, setFormData] = useState({
    departure_date: '',
    departure_time: '',
    arrival_time: '',
    price: 0,
    origin: '',
    destination: '',
    airplane_id: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      airplane_id: Number(formData.airplane_id)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={styles.formWrapper}>

      <form className={styles.addFlightForm} onSubmit={handleSubmit}>
        <h2>Add New Flight</h2>

        <div className={styles.formDetails}>
          <div className={styles.formGroup}>
            <label htmlFor="departure_date">Departure Date:</label>
            <input
              type="date"
              id="departure_date"
              name="departure_date"
              value={formData.departure_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="departure_time">Departure Time:</label>
            <input
              type="time"
              id="departure_time"
              name="departure_time"
              value={formData.departure_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="arrival_time">Arrival Time:</label>
            <input
              type="time"
              id="arrival_time"
              name="arrival_time"
              value={formData.arrival_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="origin">Origin (3-letter code):</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
              maxLength={3}
              minLength={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="destination">Destination (3-letter code):</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              maxLength={3}
              minLength={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="airplane_id">Airplane ID:</label>
            <input
              type="number"
              id="airplane_id"
              name="airplane_id"
              value={formData.airplane_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formButtons}>
            <button type="submit" className="button button--success">
              Add Flight
            </button>
            <button type="button" className="button button--outline" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default AddFlightForm; 