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
      res.status(200).json(cars);
    } catch(err) {
      res.status(500).json({ message: err });
    }
});

/**
 * @swagger
 * /cars:
 *  get:
 *    description: Returns specific car data
 *    responses:
 *      200:
 *      description: Success
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
 * /cars:
 *  delete:
 *    description: Removes specific car from database
 *    responses:
 *      200:
 *      description: Success
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
    res.status(201).json(savedCar);
  } catch(err) {
    res.status(500).json({message: err})
  }
});

module.exports = router;