import styles from './Company.module.scss';
import { Outlet, useNavigate } from 'react-router';
import CompanyNav from './companyNav/CompanyNav';
import { useEffect } from 'react';
import { setUserDetails } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';


const Company = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Check if the user is logged in
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:3000/api/users/getUserDataFromCookie',
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const res = await response.json();
      if (response.ok) {
        const data = {
          userName: res.username,
          email: res.email,
          role: res.role,
          date: res.dateTime.toString(),
          userId: res.id,
          isAuthenticated: true,
          token: res.token ?? null
        }
        dispatch(setUserDetails(data));
        if(res.role === 'Admin' || res.role === 'Sysadmin' || res.role === 'Employee'){
          navigate('/company');
        }
      } else {
        navigate('/');
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className={styles["company-container"]}>
      <CompanyNav />
      <Outlet />
    </div>
  );
};

export default Company;

