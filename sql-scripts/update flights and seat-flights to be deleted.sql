ALTER TABLE flight_seats 
DROP FOREIGN KEY flight_seats_ibfk_1;

ALTER TABLE flight_seats
ADD CONSTRAINT flight_seats_ibfk_1 
FOREIGN KEY (flight_id) 
REFERENCES flight(flight_id) 
ON DELETE CASCADE;