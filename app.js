import express from 'express';
import mysql from 'mysql';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const app = express();

// eslint-disable-next-line
const connectionString = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@db:3306/${process.env.MYSQL_DATABASE}`;

const pool = mysql.createPool(connectionString);
app.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }

        console.log('Query results:', results);
        res.json(results).status(200);
    });
});

// eslint-disable-next-line
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
