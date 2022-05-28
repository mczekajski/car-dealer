const express = require('express');

const app = express();

/**
 * @swagger
 * /cars:
 *  get:
 *    description: Get all cars list
 *    responses:
 *      200:
 *      description: Success
 */
app.get('/cars', (req, res) => {
    res.send([
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla'
        }
    ])
})

app.get('/', (req, res) => {
    res.send('Car dealer api is working on port 3000')
});

module.exports = app;
