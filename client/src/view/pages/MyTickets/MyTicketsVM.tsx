import { useEffect, useState } from "react";
import ITicket from "../../../../../server/src/model/tickets/ticketModel";  

const API_URL = "http://localhost:3000/users/tickets";

export const useMyTicketsVM = (userId: number) => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${API_URL}/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch tickets");

      const data: ITicket[] = await response.json();
      setTickets(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [userId]);

  return { tickets, loading, error };
};
