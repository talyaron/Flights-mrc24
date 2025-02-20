export interface FlightCompany {
    company_id: number;
    name: string;
    iata_code: string;
}

export interface Airplane {
    airplane_id: number;
    model: string;
    capacity: number;
    company_id: number;
}

export interface Flight {
    flight_id: number;
    airplane_id: number;
    departure_date: string; // Will be handled as YYYY-MM-DD format
    departure_time: string; // Will be handled as HH:mm:ss format
    arrival_time: string;   // Will be handled as HH:mm:ss format
    price: number;
    origin: string;        // 3-letter airport code
    destination: string;   // 3-letter airport code
}

export interface Seat {
    seat_id: number;
    airplane_id: number;
    seat_number: string;
}

export interface FlightSeat {
    flight_id: number;
    seat_id: number;
    passenger_id: number | null;
    seat_row: number;
    seat: string;         // Single character for seat letter
}

export interface Passenger {
    passenger_id: number;
    name: string;
    passport_number: string;
}
