create database flights;

use flights;

-- Flight Company table
CREATE TABLE Flight_Company (
    company_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    iata_code CHAR(2)
);

-- Modified Airplane table
CREATE TABLE Airplane (
    airplane_id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(50),
    capacity INT,
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES Flight_Company(company_id)
);

-- Modified Flight table
CREATE TABLE Flight (
    flight_id INT PRIMARY KEY AUTO_INCREMENT,
    airplane_id INT,
    departure_date DATE,
    departure_time TIME,
    arrival_time TIME,
    price DECIMAL(10,2),
    origin VARCHAR(3),
    destination VARCHAR(3),
    FOREIGN KEY (airplane_id) REFERENCES Airplane(airplane_id)
);

-- Seat table remains similar
CREATE TABLE Seat (
    seat_id INT PRIMARY KEY AUTO_INCREMENT,
    airplane_id INT,
    seat_number VARCHAR(3),
    FOREIGN KEY (airplane_id) REFERENCES Airplane(airplane_id)
);

-- Flight_Seats table modified
CREATE TABLE Flight_Seats (
    flight_id INT,
    seat_id INT,
    passenger_id BIGINT NULL,
    seat_row TINYINT,
    seat CHAR(1),
    PRIMARY KEY (flight_id, seat_id),
    FOREIGN KEY (flight_id) REFERENCES Flight(flight_id),
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id),
    FOREIGN KEY (passenger_id) REFERENCES Passenger(passenger_id)
);

-- Passenger table remains the same
CREATE TABLE Passenger (
    passenger_id BIGINT PRIMARY KEY,
    name VARCHAR(60),
    passport_number VARCHAR(50)
);