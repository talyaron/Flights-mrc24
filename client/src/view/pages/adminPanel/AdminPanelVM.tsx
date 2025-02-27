import { useEffect, useState } from "react";
import { IUser } from "../../../../../server/src/model/users/userModel";

const API_URL = "http://localhost:3000/api/users";

export const useAdminPanelVM = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/getUsers`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: IUser[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: number, newRole: IUser["role"]) => {
    try {
      const response = await fetch(`${API_URL}/updateUserRole`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) throw new Error("Failed to update role");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, updateUserRole };
};
