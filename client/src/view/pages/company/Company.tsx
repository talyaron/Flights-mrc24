
import { Outlet } from 'react-router';
import styles from "./Company.module.scss";

const Company = () => {
  return (
    <div>
        <h1>Company HomePage</h1>
        <Outlet />
    </div>
  )
}

export default Company