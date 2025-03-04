import express from "express";
import {
  getAllFlights,
  addFlight,
  searchFlights,
  getFlightOrigin,
  getFlightDestinations,
} from "../../controllers/flights/flightsCont";

const router = express.Router();

// Get all flights
router.get("/get-all-flights", getAllFlights);
router.post("/add-flight", addFlight);
router.get("/search-flights", searchFlights);
router.get("/flight-destinations", getFlightDestinations);
router.get("/flight-origin", getFlightOrigin);

export default router;
