import { NavLink } from "react-router";
import styles from "./CompanyNav.module.scss";

const CompanyNav = () => {
  return (
    <div className={styles.companyNav}>
        <NavLink to="/company" activeClassName={styles.active} end>Home</NavLink>
        <NavLink to="/company/waiting" activeClassName={styles.active} end>Waiting</NavLink>
        <NavLink to="/company/admin-panel" activeClassName={styles.active}>Admin Panel</NavLink>
        <NavLink to="/company/set-flights" activeClassName={styles.active}>Set Flights</NavLink>
        <NavLink to="/company/add-flight" activeClassName={styles.active}>Add Flight</NavLink>
    </div>
  )
}

export default CompanyNav