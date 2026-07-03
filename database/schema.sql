CREATE DATABASE IF NOT EXISTS libro_recuerdos;
USE libro_recuerdos;

CREATE TABLE IF NOT EXISTS entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) DEFAULT 'Amigo/a',
    message TEXT NOT NULL,
    photo_filename VARCHAR(255) NOT NULL,
    photo_original_name VARCHAR(255),
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
