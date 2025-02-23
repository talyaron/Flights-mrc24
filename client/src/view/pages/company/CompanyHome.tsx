import React, { useState} from "react";

const FlightSearch: React.FC = () => {
    const[date, setDate] = useState("");

    const handleSearch = () => {
        // Perform flight search based on the date
        console.log(`Searching for flights on ${date}`);
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
        </div>
      );
    };
    
    export default FlightSearch;