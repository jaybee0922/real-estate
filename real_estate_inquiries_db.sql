-- Create the database
CREATE DATABASE IF NOT EXISTS real_estate_inquiries;

USE real_estate_inquiries;

CREATE TABLE
    inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        property ENUM ('house', 'apartment', 'land') NOT NULL,
        budget DECIMAL(10, 2),
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- email column to ensure no duplicate emails
CREATE UNIQUE INDEX idx_email ON inquiries (email);