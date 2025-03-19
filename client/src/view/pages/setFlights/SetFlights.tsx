import styles from './SetFlights.module.scss';
import { useSetFlightsVM } from './SetFlightsVM';
import AddFlightForm from './AddFlightForm';
import UpdateFlightForm from './UpdateFlightForm';
import { Flight } from '../../../model/flightsModel';
import { useState } from 'react';

const SetFlights = () => {
  const {
    flights,
    selectedFlights,
    toggleFlightSelection,
    handleDelete,
    handleUpdate,
    handleUpdateAll,
    showAddForm,
    setShowAddForm,
    handleAddFlight,
    handleBack, // Use the one from useSetFlightsVM
  } = useSetFlightsVM();

  const [chosenFlight, setChosenFlight] = useState<Flight | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Invalid Date';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/ /g, '-');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className="button button--outline button--small">
          Back
        </button>
        <button
          onClick={() => setShowAddForm(true)}
          className="button button--success button--small"
        >
          Add Flight
        </button>
      </div>

      {showAddForm && (
        <AddFlightForm
          onSubmit={handleAddFlight}
          onCancel={() => setShowAddForm(false)}
        />
      )}



      <div className={styles.flightsList}>
        {flights.map((flight) => (
          <div key={flight.flight_id.toString()} className={styles.flightCard}>
            <div className={styles.leftSection}>
              <input
                type="checkbox"
                checked={selectedFlights.has(flight.flight_id.toString())}
                onChange={() => toggleFlightSelection(flight.flight_id.toString())}
              />
              <button
                className="button button--danger button--small"
                onClick={() => handleDelete(flight.flight_id.toString())}
              >
                Delete
              </button>
              <span>
                {flight.origin} - {flight.destination} {formatDate(flight.departure_date)} {flight.departure_time} - {flight.arrival_time} ${flight.price}
              </span>
            </div>
            <button
              className="button button--primary button--small update-button"
              onClick={() => { setChosenFlight(flight); setShowUpdateForm(true); }}
            >
              Update 33
            </button>
          </div>
        ))}
      </div>

      {flights.length > 0 && (
        <button
          className="button button--success"
          onClick={handleUpdateAll}
        >
          Update All
        </button>
      )}
      {showUpdateForm && <UpdateFlightForm flight={chosenFlight} close={() => setShowUpdateForm(false)} handleUpdate={handleUpdate }/>}
    </div>
  );
};

export default SetFlights;
