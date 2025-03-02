import React from "react";
import { useFlightSearchResultsVM } from "./FlightSearchResultsVM";
import "./FlightSearchResults.module.scss";

interface Props {
  departureDate: string;
  destination: string;
}

const FlightSearchResults: React.FC<Props> = ({ departureDate, destination }) => {
  const { flights, loading, error } = useFlightSearchResultsVM(departureDate, destination);

  if (loading) return <p>Loading flights...</p>;
  if (error) return <p>Error: {error}</p>;
  if (flights.length === 0) return <p>No flights found</p>;

  return (
    <div className="flightResults">
      {flights.map((flight) => (
        <div key={flight.flight_id} className="flightCard">
          <h3>Flight ID: {flight.flight_id}</h3>
          <p>Origin: {flight.origin}</p>
          <p>Destination: {flight.destination}</p>
          <p>Departure Date: {flight.departure_date}</p>
          <p>Departure Time: {flight.departure_time}</p>
          <p>Arrival Time: {flight.arrival_time}</p>
          <p>Price: ${flight.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightSearchResults;
