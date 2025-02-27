import express from 'express';
import { getAllFlights, addFlight, searchFlightsByDate } from '../../controllers/flights/flightsCont';

const router = express.Router();

// Get all flights
router.get('/get-all-flights', getAllFlights);
router.post('/add-flight', addFlight);
router.get('/search-flights', searchFlightsByDate); 

export default router;
