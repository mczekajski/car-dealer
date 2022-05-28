const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const carsRoute = require('./routes/cars');

const app = express();
app.set('x-powered-by', false);
dotenv.config();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.set('trust proxy', 1);

// Allow CORS from any origin
app.use(cors());

// Database connection
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to database')
});

app.use('/cars', carsRoute)

app.get('/', (req, res) => {
    res.send('Car dealer api is working on port 3000')
});

module.exports = app;
