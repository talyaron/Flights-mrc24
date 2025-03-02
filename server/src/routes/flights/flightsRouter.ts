import express from 'express';
import { getAllFlights, addFlight,getFlightsBySearch } from '../../controllers/flights/flightsCont';

const router = express.Router();

// Get all flights
router.get('/get-all-flights', getAllFlights);
router.post('/add-flight', addFlight);
router.get("/search", getFlightsBySearch);

export default router;
