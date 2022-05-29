const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

/**
 * @swagger
 * /cars:
 *  get:
 *    tags:
 *    - cars
 *    summary: Returns list of all cars in database
 *    description: Returns list of all cars in database
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', async (req, res) => {
    try {
      const cars = await Car.find();
      res.status(200).json(cars);
    } catch(err) {
      res.status(500).json({ message: err });
    }
});

/**
 * @swagger
 * /cars/{carId}:
 *  get:
 *    tags:
 *    - cars
 *    summary: Returns specific car data
 *    description: Returns specific car data
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/:carId', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err });
  }
})

/**
 * @swagger
 * /cars/{carId}:
 *  delete:
 *    tags:
 *      - cars
 *    summary: Removes specific car from database
 *    description: Removes specific car from database
 *    responses:
 *      200:
 *        description: Success
 */
router.delete('/:carId', async (req, res) => {
  try {
    const removedCar = await Car.remove({ _id: req.params.carId });
    res.status(200).json(removedCar);
  } catch (err) {
    res.json({ message: err});
  }
})

/**
 * @swagger
 * /cars:
 *  post:
 *    tags:
 *    - cars
 *    summary: Adds a new car to database
 *    description: Adds a new car to database
 *    parameters:
 *    - name: brand
 *      description: Car brand, e.g. "Toyota"
 *    responses:
 *      201:
 *        description: Created
 */
router.post('/', async (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model
  });
  try {
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch(err) {
    res.status(400).json({message: err})
  }
});

module.exports = router;