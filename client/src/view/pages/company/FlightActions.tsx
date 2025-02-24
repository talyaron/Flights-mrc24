import React from 'react';
import { useNavigate } from 'react-router';

const FlightActions: React.FC = () => {
    const navigate = useNavigate();
  
    const handleAdd = () => {
      navigate('/add-flight');
    };
  
    const handleUpdate = () => {
      // Implement update logic
      console.log('Updating flight');
    };
  
    const handleDelete = () => {
      // Implement delete logic
      console.log('Deleting flight');
    };
  
    return (
      <div>
        <h2>Flight Actions</h2>
        <button onClick={handleAdd}>Add Flight</button>
        <button onClick={handleUpdate}>Update Flight</button>
        <button onClick={handleDelete}>Delete Flight</button>
      </div>
    );
  };
  
  export default FlightActions;