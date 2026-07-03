const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      }
    });

    await connection.query('DROP TABLE IF EXISTS entries;');
    await connection.query('DROP TABLE IF EXISTS settings;');
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS entries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          author_name VARCHAR(100) NOT NULL,
          relationship VARCHAR(50) DEFAULT 'Amigo/a',
          message TEXT NOT NULL,
          photo_url VARCHAR(255) NOT NULL,
          photo_public_id VARCHAR(255) DEFAULT NULL,
          display_order INT DEFAULT 0,
          is_visible BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT PRIMARY KEY DEFAULT 1,
        book_title VARCHAR(255) DEFAULT 'Libro de Recuerdos',
        book_subtitle TEXT,
        is_accepting_entries BOOLEAN DEFAULT TRUE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      INSERT INTO settings (id, book_title, book_subtitle, is_accepting_entries) 
      VALUES (1, 'Libro de Recuerdos', 'Una colección de momentos y palabras de las personas que más te quieren.', TRUE)
      ON DUPLICATE KEY UPDATE id=1;
    `);

    console.log('Tablas creadas exitosamente.');
    await connection.end();
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
  }
}

initDB();
