import { NavLink } from "react-router";
import styles from "./CompanyNav.module.scss";

const CompanyNav = () => {
  return (
    <div className={styles.companyNav}>
        <NavLink to="/company" className={({ isActive }) => isActive ? styles.active : ""} end>Home</NavLink>
        <NavLink to="/company/admin-panel" className={({ isActive }) => isActive ? styles.active : ""}>Admin Panel</NavLink>
        <NavLink to="/company/set-flights" className={({ isActive }) => isActive ? styles.active : ""}>Set Flights</NavLink>
        <NavLink to="/company/add-flight" className={({ isActive }) => isActive ? styles.active : ""}>Add Flight</NavLink>
    </div>
  )
}

export default CompanyNav