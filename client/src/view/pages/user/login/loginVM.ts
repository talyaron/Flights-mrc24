import { useState } from 'react';
import { login } from '../../../../controllers/auth/users/login';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {  setUserDetails } from '../../../../store/slices/userSlice';
import { flightDetails } from '../../../../store/slices/bookFlightSlice';



export const useLoginViewModel = () => {
  const navigate = useNavigate();
  const flight = useSelector(flightDetails);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const form = new FormData(e.target as HTMLFormElement);
      const email = form.get('email') as string;
      const password = form.get('password') as string;

      setError(null);
      const {ok, payload, token,date} = await login(email, password);
      if (ok) {
        const data = {
          userName: payload.username,
          email: payload.email,
          role: payload.role,
          date: date.toString(),
          userId: payload.userId,
          isAuthenticated: true,
          token: token
        }
        dispatch(setUserDetails(data));
        if (flight.flightId !== "0") {
          navigate(`/booking-flight/${flight.flightId}`);
        } else {
          navigate('/home');
        }
      }
    } catch (err:any) {
      setError('Invalid username or password', err.message);
    }
  };

  return {handleSubmit, error };
};
