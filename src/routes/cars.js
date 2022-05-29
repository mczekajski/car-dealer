const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

/**
 * @swagger
 * /cars:
 *  get:
 *    description: Get all cars list
 *    responses:
 *      200:
 *      description: Success
 */
router.get('/', async (req, res) => {
    try {
      const posts = await Car.find();
      res.json(posts);
    } catch(err) {
      res.json( { message: err});
    }
});

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