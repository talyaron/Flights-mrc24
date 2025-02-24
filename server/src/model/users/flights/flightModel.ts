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


export default Flight;