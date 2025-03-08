
import './Company.module.scss';
import { Outlet } from 'react-router';
import CompanyNav from './companyNav/CompanyNav';




const Company = () => {
  return (
    <div className="company-container">
      <CompanyNav />
      <Outlet />
    </div>
  );
};

export default Company;