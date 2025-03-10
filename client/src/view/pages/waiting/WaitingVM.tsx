import  { useEffect, useState } from "react";


const API_URL = "http://localhost:3000/api/users";

export const useWaitingRoomVM = () => {
  const [status, setStatus] = useState<string>("waiting");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized access. Please log in.");

      const response = await fetch(`${API_URL}/status`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user status");

      const data = await response.json();
      setStatus(data.status);

      if (data.status === "rejected") {
        localStorage.removeItem("token");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
    const interval = setInterval(fetchUserStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return { status, error, loading };
};

