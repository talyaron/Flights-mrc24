

import SetFlights from '../setFlights/SetFlights';
import CompanyHome from './companyHome/CompanyHome';
import styles from './Company.module.scss';

const Company = () => {
  return (
    <div className="company-container">

      <div className={styles["management-section"]}>
        <h2 className="company-title">Flight Management</h2>
        <SetFlights />
      </div>


      <div className="search-section">
        <h2 className="company-title">Flight Search</h2>
        <CompanyHome />
      </div>
    </div>
  );
};
export default Company;