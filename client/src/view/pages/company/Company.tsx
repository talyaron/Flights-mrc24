
import { Outlet } from 'react-router';
import styles from "./Company.module.scss";
import { Link } from 'react-router';



const Company = () => {
  return (
    <div>
        <h1>Company HomePage</h1>

        <Link to="/SetFlights">
        <button>Manage Flights</button>
      </Link>
        <Outlet />
    </div>
  )
}

export default Company;