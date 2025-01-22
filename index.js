const express = require('express');
require('dotenv').config();
const { dbConection } = require('./db/config');
const cors = require('cors');

// Create an Express app
const app = express();

// Database
dbConection();

// CORS
app.use(cors());

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