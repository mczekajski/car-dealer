const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

/**
 * @swagger
 * /cars:
 *  get:
 *    description: Returns list of all cars in database
 *    responses:
 *      200:
 *      description: Success
 */
router.get('/', async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch(err) {
      res.json( { message: err });
    }
});

/**
 * @swagger
 * /cars:
 *  post:
 *    description: Adds a new car to database
 *    responses:
 *      201:
 *      description: Created
 */
router.post('/', async (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model
  });
  try {
    const savedCar = await car.save();
    res.json(savedCar);
  } catch(err) {
    res.json({message: err})
  }
});

module.exports = router;