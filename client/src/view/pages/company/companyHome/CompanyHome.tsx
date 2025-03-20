import React, { useState, useEffect } from "react";
import styles from "../Company.module.scss";

const CompanyHome: React.FC = () => {
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchAllFlights = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/flights/get-all-flights");
        if (!response.ok) throw new Error("Failed to fetch flights");
        
        const data = await response.json();
        setFlights(data.flights);
      } catch (err) {
        console.error("Error fetching all flights:", err);
        setError("Could not fetch all flights. Please try again.");
      }
    };

    fetchAllFlights();
  }, []);
  
  const handleSearch = async () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    console.log("Selected Date:", date); 

    try {
      const response = await fetch(`http://localhost:3000/api/flights/get-all-flights?ddate=${date}`);
      
      if (!response.ok) throw new Error("Failed to fetch flights");
      
      const data = await response.json();
      console.log(data.flights)
      setFlights(data.flights);
      console.log(data);
    } catch (err) {
      console.error("Error fetching flights:", err);
      console.log(err);
      setError("Could not fetch flights. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Search Flights</h2>
  
        <div className={styles.searchBox}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.dateInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
  
        {error && <p className={styles.errorMessage}>{error}</p>}
  
        <h3 className={styles.subtitle}>Available Flights</h3>
        <ul className={styles.flightsList}>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <li key={flight.flight_id} className={styles.flightItem}>
                ✈ {flight.airline} - {flight.origin} ➝ {flight.destination} <br />
                🗓 Date: {flight.departure_date} ⏰ Time: {flight.departure_time}
              </li>
            ))
          ) : (
            <p className={styles.noFlights}>No flights found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};  

export default CompanyHome;
