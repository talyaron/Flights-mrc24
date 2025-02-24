import { Flight } from "../../../model/flightsModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useSetFlightsVM() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [selectedFlights, setSelectedFlights] = useState<Set<string>>(new Set());
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();

    const fetchFlights = async () => {
        const response = await fetch('http://localhost:3000/api/flights/get-all-flights');
        const data = await response.json();
        setFlights(data.flights);
        console.log(data.flights);
    }

    useEffect(() => {
        fetchFlights();
    }, []);

    const toggleFlightSelection = (flightId: string) => {
        setSelectedFlights(prev => {
            const newSet = new Set(prev);
            if (newSet.has(flightId)) {
                newSet.delete(flightId);
            } else {
                newSet.add(flightId);
            }
            return newSet;
        });
    };

    const handleDelete = async (flightId: string) => {
        // TODO: Implement delete functionality
        console.log('Delete flight:', flightId);
    };

    const handleUpdate = async (flightId: string) => {
        // TODO: Implement update functionality
        console.log('Update flight:', flightId);
    };

    const handleUpdateAll = async () => {
        // TODO: Implement update all functionality
        console.log('Update all selected flights:', Array.from(selectedFlights));
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddFlight = async (flightData: {
        departure_date: string;
        departure_time: string;
        arrival_time: string;
        price: number;
        origin: string;
        destination: string;
        airplane_id: number;
    }) => {
        try {
            const response = await fetch('http://localhost:3000/api/flights/add-flight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flightData),
            });

            if (!response.ok) {
                throw new Error('Failed to add flight');
            }

            await fetchFlights(); // Refresh the flights list
            setShowAddForm(false); // Hide the form after successful addition
        } catch (error) {
            console.error('Error adding flight:', error);
            // You might want to add error handling/user feedback here
        }
    };

    return {
        flights,
        selectedFlights,
        toggleFlightSelection,
        handleDelete,
        handleUpdate,
        handleUpdateAll,
        handleBack,
        showAddForm,
        setShowAddForm,
        handleAddFlight,
    }
}
