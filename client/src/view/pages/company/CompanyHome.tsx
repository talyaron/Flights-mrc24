import React, { useState } from "react";

const FlightSearch: React.FC = () => {
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:3000/api/flights/get-all-flights?date=${date}`);
      if (!response.ok) throw new Error("Failed to fetch flights");
      
      const data = await response.json();
      setFlights(data);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Could not fetch flights. Please try again.");
    }
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Available Flights</h3>
      <ul>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <li key={flight.flight_id}>
              ✈ {flight.airline} - {flight.origin} ➝ {flight.destination} at {flight.departure_time}
            </li>
          ))
        ) : (
          <p>No flights found.</p>
        )}
      </ul>
    </div>
  );
};

export default FlightSearch;
