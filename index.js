const express = require('express');
require('dotenv').config();
const { dbConection } = require('./db/config');
const cors = require('cors');

// Create an Express app
const app = express();

// Database
dbConection();

// CORS
app.use(cors({
    origin: 'https://t0n1-dev.github.io', // Dominio de tu frontend en GitHub Pages
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Permitir el uso de cookies o cabeceras como 'x-token'
    }
));

// Public Directory
app.use( express.static('public') );

// Read and parse Body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Listen request
app.listen( process.env.PORT, () => {
    console.log(`Server running on ${ process.env.PORT } port`)
});