export interface ITicket {
    ticket_id: number;
    user_id: number;
    flight_id: number;
    purchase_date: string; 
    seat_number: string;
    price: number;
    origin: string;
    destination: string;
    departure_date: string;
    departure_time: string;
    arrival_time: string;
  }
  
  export default ITicket;
  