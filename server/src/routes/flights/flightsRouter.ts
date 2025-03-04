import express from 'express';
import { getAllFlights, addFlight, searchFlightsByDate, deleteFlight, updateFlight, updateAllFlights, searchFlights} from '../../controllers/flights/flightsCont';


const router = express.Router();

// Get all flights
router.get('/get-all-flights', getAllFlights);
router.post('/add-flight', addFlight);
router.get('/search-flights', searchFlightsByDate); 
router.delete('/delete-flight/:flightId', deleteFlight);
router.put('/update-flight', updateFlight);
router.put('/update-all-flights', updateAllFlights);
router.get('/search-flights', searchFlights);
router.get("/flight-destinations", getFlightDestinations);
router.get("/flight-origin", getFlightOrigin);


export default router;
