//create a slice for book flight
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Flight } from "../../model/flightsModel";

export interface FlightDetailsState {
  companyName: string;
  flightNumber: string;
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  flightId: string;
}

const initialState: FlightDetailsState = {
  companyName: '',
  flightNumber: '',
  departureDate: '',
  arrivalDate: '',
  departureTime: '',
  arrivalTime: '',
  departureAirport: '',
  arrivalAirport: '',
  flightId: '',
};

const bookFlightSlice = createSlice({
  name: 'bookFlight',
  initialState,
  reducers: {
    setFlightDetails: (state, action: PayloadAction<Flight>) => {
      state.flightId = action.payload.flight_id.toString();
      state.departureAirport = action.payload.origin;
      state.arrivalAirport = action.payload.destination;
      state.departureDate = action.payload.departure_date;
      state.arrivalDate = action.payload.departure_date;
      state.departureTime = action.payload.departure_time;
      state.arrivalTime = action.payload.arrival_time;
      state.companyName = 'Airline Name'; // Set this if available in your Flight model
      state.flightNumber = action.payload.flight_id.toString();
    },
  },
});

export const { setFlightDetails } = bookFlightSlice.actions;
export const flightDetails = (state: { bookFlight: FlightDetailsState }) => state.bookFlight;
export default bookFlightSlice.reducer;


