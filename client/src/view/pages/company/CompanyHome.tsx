import React, { useState, useEffect } from "react";

const EmployeeFlights = () => {
    const [flights, setFlights] = useState<{ id: number; airline: string; departure: string; arrival: string; date: string }[]>([]);
    const [newFlight, setNewFlight] = useState({ airline: "", departure: "", arrival: "", date: "" });
    const [searchDate, setSearchDate] = useState("");

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/flights");
            const data = await res.json();
            setFlights(data);
        } catch (err) {
            console.error("Error fetching flights:", err);
        }
    };

    const addFlight = async () => {
        if (!newFlight.airline || !newFlight.departure || !newFlight.arrival || !newFlight.date) return;

        try {
            const res = await fetch("http://localhost:3000/api/flights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFlight),
            });
            if (res.ok) {
                setNewFlight({ airline: "", departure: "", arrival: "", date: "" });
                fetchFlights();
            }
        } catch (err) {
            console.error("Error adding flight:", err);
        }
    };

    const searchFlightsByDate = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/flights?date=${searchDate}`);
            const data = await res.json();
            setFlights(data);
        } catch (err) {
            console.error("Error searching flights:", err);
        }
    };

    return (
        <div>
            <h1>Flight Management</h1>

            {/* Search Flights */}
            <div>
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <button onClick={searchFlightsByDate}>Search Flights</button>
            </div>

            {/* Add Flight */}
            <div>
                <input
                    type="text"
                    placeholder="Airline"
                    value={newFlight.airline}
                    onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Departure"
                    value={newFlight.departure}
                    onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Arrival"
                    value={newFlight.arrival}
                    onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
                />
                <input
                    type="date"
                    value={newFlight.date}
                    onChange={(e) => setNewFlight({ ...newFlight, date: e.target.value })}
                />
                <button onClick={addFlight}>Add Flight</button>
            </div>

            {/* Display Flights */}
            <ul>
                {flights.map((flight) => (
                    <li key={flight.id}>
                        {flight.airline} | {flight.departure} → {flight.arrival} | {flight.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeFlights;
