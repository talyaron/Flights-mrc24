//create a slice for book flight
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Flight } from "../../model/flightsModel";


export interface FlightDetailsState {
   flightDetails: Flight;
  }
  const initialState: FlightDetailsState = {
    flightDetails: {} as Flight,
  };

const bookFlightSlice = createSlice({
    name: 'bookFlight',
    initialState,
    reducers: {
        setFlightDetails: (state, action: PayloadAction<FlightDetailsState>) => {
            state = action.payload;
        },
    },
});


export const { setFlightDetails } = bookFlightSlice.actions;
export const flightDetails = (state:RootState) => state.bookFlight.flightDetails;
export default bookFlightSlice.reducer;


