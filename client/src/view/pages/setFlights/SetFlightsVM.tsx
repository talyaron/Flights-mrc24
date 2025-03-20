import { Flight } from "../../../model/flightsModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export function useSetFlightsVM() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [selectedFlights, setSelectedFlights] = useState<Set<string>>(new Set());
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const navigate = useNavigate();


const handleUpdateClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowUpdateForm(true);
};
    const fetchFlights = async () => {
        const response = await fetch('http://localhost:3000/api/flights/get-all-flights');
        const data = await response.json();
        setFlights(data.flights);
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
        try {
            const response = await fetch(`http://localhost:3000/api/flights/delete-flight/${flightId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete flight');
            }
            await fetchFlights(); // Refresh the flights list
        } catch (error) {
            console.error('Error deleting flight:', error);
        }
    };
    
    const handleUpdate = async (flightId: string, updatedData: Partial<Flight>) => {
        try {
            const response = await fetch(`http://localhost:3000/api/flights/update-flight/${flightId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update flight');
            }
            await fetchFlights();
            setShowUpdateForm(false);
            setSelectedFlight(null);
        } catch (error) {
            console.error('Error updating flight:', error);
        }
    };

    const handleUpdateAll = async () => {
        try {
          for (const flightId of selectedFlights) {
            await handleUpdate(flightId, {}); // Pass an empty object as the updated data
          }
          setSelectedFlights(new Set());
        } catch (error) {
          console.error('Error updating selected flights:', error);
        }
      };
    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/'); // Fallback to home if there's no history
        }
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
        handleUpdateClick,
        handleBack,
        showAddForm,
        setShowAddForm,
        handleAddFlight,
        showUpdateForm,
        setShowUpdateForm,
        selectedFlight,
    }
}
