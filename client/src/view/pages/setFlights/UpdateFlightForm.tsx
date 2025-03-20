import React, { useState } from "react";
import { Flight } from "../../../model/flightsModel";

interface UpdateFlightFormProps {
    flight: Flight|null;
    handleUpdate: (flightId: number, updatedData: Partial<Flight>) => void;
    close: () => void;
}

const UpdateFlightForm: React.FC<UpdateFlightFormProps> = ({ flight, close, handleUpdate }) => {
    const [formData, setFormData] = useState<Partial<Flight>>({ ...flight });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!flight || !flight.flight_id) {
            console.error("Invalid flight data.");
            return;
        }
    
        // Filter out unchanged fields
        const updatedData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== flight[key as keyof Flight])
        );
    
        if (Object.keys(updatedData).length === 0) {
            console.log("No changes detected.");
            close();
            return;
        }
    
        console.log("Submitting update:", updatedData);
        handleUpdate(flight.flight_id, updatedData);
        close();
    };
    

    if (!flight) return null;

    return (
        <div className="modal" onClick={close}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h2>Update Flight</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                    <input type="date" name="departure_date" value={formData.departure_date} onChange={handleChange} required />
                    <input type="time" name="departure_time" value={formData.departure_time} onChange={handleChange} required />
                    <input type="time" name="arrival_time" value={formData.arrival_time} onChange={handleChange} required />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    <button type="submit">Update</button>
                    <button type="button" onClick={()=>close()}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateFlightForm;
