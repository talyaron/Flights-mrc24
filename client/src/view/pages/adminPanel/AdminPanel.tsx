import React from "react";
import { useAdminPanelVM } from "./AdminPanelVM";
import styles from "./AdminPanel.module.scss"; 
import { Link } from "react-router";

const AdminPanel: React.FC = () => {
  const { users, loading, error, updateUserRole } = useAdminPanelVM();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles["admin-panel"]}>
      <h1>Admin Panel</h1>
      <Link to='/company'>Company</Link>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id} className={styles["user-card"]}>
          <p><strong>{user.username}</strong></p>
          <p>{user.email}</p>
          <select
            value={user.role}
            onChange={(e) => updateUserRole(user.id!, e.target.value as any)}
          >
            <option value="Passenger">Passenger</option>
            <option value="Employee">Employee</option>
            <option value="SysAdmin">SysAdmin</option>
            <option value="Waiting">Waiting</option>
            <option value="Not_Active">Not Active</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
