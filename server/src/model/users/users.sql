CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Passenger', 'Employee', 'Sysadmin', 'Waiting', 'Not_Active') DEFAULT 'Waiting',
    dateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

