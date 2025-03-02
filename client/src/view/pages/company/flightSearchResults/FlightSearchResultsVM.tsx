import { useState, useEffect } from "react";
import Flight from "../../../../../../server/src/model/users/flights/flightModel";

const API_URL = "http://localhost:3000/api/flights/search"; 

export const useFlightSearchResultsVM = (departureDate: string, destination: string) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    try {
      const response = await fetch(`${API_URL}?departure_date=${departureDate}&destination=${destination}`);

      if (!response.ok) throw new Error("Failed to fetch flights");

      const data: Flight[] = await response.json();
      setFlights(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [departureDate, destination]);

  return { flights, loading, error };
};
