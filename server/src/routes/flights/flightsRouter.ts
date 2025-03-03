import express from 'express';
import { getAllFlights, addFlight, searchFlights } from '../../controllers/flights/flightsCont';

const router = express.Router();

// Get all flights
router.get('/get-all-flights', getAllFlights);
router.post('/add-flight', addFlight);
router.get('/search-flights', searchFlights);

export default router;
