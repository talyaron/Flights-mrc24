import React from "react";
import { useMyTicketsVM } from "./MyTicketsVM";
import ITicket from "../../../../../server/src/model/tickets/ticketModel"; 
import styles from "./MyTickets.module.scss"; 

interface Props {
  userId: number;
}

const MyTickets: React.FC<Props> = ({ userId }) => {
  const { tickets, loading, error } = useMyTicketsVM(userId);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error: {error}</p>;
  if (tickets.length === 0) return <p>No tickets found</p>;

  return (
    <div className={styles.ticketsContainer}>
      {tickets.map((ticket: ITicket) => (
        <div key={ticket.ticket_id} className={styles.ticketCard}>
          <h3>Flight {ticket.flight_id}</h3>
          <p><strong>From:</strong> {ticket.origin} → <strong>To:</strong> {ticket.destination}</p>
          <p><strong>Departure:</strong> {ticket.departure_date} at {ticket.departure_time}</p>
          <p><strong>Arrival:</strong> {ticket.arrival_time}</p>
          <p><strong>Seat:</strong> {ticket.seat_number}</p>
          <p><strong>Price:</strong> ${ticket.price}</p>
          <p><strong>Purchased on:</strong> {new Date(ticket.purchase_date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
