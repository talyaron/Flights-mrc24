import React from 'react';
import SetFlights from '../setFlights/SetFlights';
import './Company.module.scss';
import CompanyHome from './companyHome/CompanyHome';




const Company = () => {
  return (
    <div className="company-container">
      {/* Left Panel - Flight Management */}
      <div className="management-section">
        <h2 className="company-title">Flight Management</h2>
        <SetFlights />
      </div>
      
      {/* Right Panel - Flight Search */}
      <div className="search-section">
        <h2 className="company-title">Flight Search</h2>
        <CompanyHome />
      </div>
    </div>
  );
};

export default Company;