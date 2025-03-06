import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "../../model/flightsModel";
import { RootState } from "../store";

interface FlightResultsState {
  flights: Flight[];
}

// Get initial state from localStorage or use empty array
const initialState: FlightResultsState = {
  flights: []
};

const flightResultsSlice = createSlice({
  name: "flightResults",
  initialState,
  reducers: {
    updateFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
      // Save to localStorage when updating
      localStorage.setItem('flightResults', JSON.stringify(action.payload));
    },
    resetFlights: (state) => {
      state.flights = [];
      // Clear localStorage when resetting
      localStorage.removeItem('flightResults');
    },
  },
});

export const { updateFlights, resetFlights } = flightResultsSlice.actions;
export const flightResults = (state: RootState) => state.flightResults.flights;

export default flightResultsSlice.reducer;