const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const verifyIsAdmin = require("./verifyIsAdmin");
const Car = require("../models/Car");

/**
 * @swagger
 * /cars:
 *  get:
 *    tags:
 *    - cars
 *    summary: Returns list of all cars in database
 *    parameters:
 *      - in: query
 *        name: page
 *        type: integer
 *        required: true
 *        description: Numeric ID of the page of cars pagination
 *      - in: query
 *        name: limit
 *        type: integer
 *        required: true
 *        description: Number of cars in single response
 *    description: Returns list of all cars in database
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/", async (req, res) => {
  try {
    let cars;

    if (req.query.page && req.query.limit) {
      cars = await Car.paginate(
        {},
        { page: req.query.page, limit: req.query.limit }
      );
    } else {
      cars = await Car.find();
    }

    res.status(200).json(cars);
  } catch (err) {
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
router.get("/:carId", async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

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
router.delete("/:carId", verifyToken, verifyIsAdmin, async (req, res) => {
  try {
    const removedCar = await Car.remove({ _id: req.params.carId });
    res.status(200).json(removedCar);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /cars:
 *  post:
 *    tags:
 *    - cars
 *    summary: Adds a new car to database
 *    description: Adds a new car to database
 *    parameters:
 *    - in: body
 *      name: Car
 *      description: Car to add
 *      schema:
 *        type: object
 *        required:
 *          - brand
 *          - model
 *        properties:
 *          brand:
 *            type: string
 *            default: "Toyota"
 *          model:
 *            type: string
 *            default: "Corolla"
 *    responses:
 *      201:
 *        description: Created
 */
router.post("/", verifyToken, verifyIsAdmin, async (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model,
  });
  try {
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
