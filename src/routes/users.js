const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { loginValidation, registerValidation } = require("../validation");

// REGISTRATION
/**
 * @swagger
 * /users/register:
 *  post:
 *    tags:
 *    - user
 *    summary: Registers new user
 *    description: Registers new user
 *    parameters:
 *    - in: body
 *      email: string
 *      password: string
 *      schema:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            minLength: 6
 *            default: "user@mail.com"
 *          password:
 *            type: string
 *            minLength: 8
 *            default: "test1234"
 *    responses:
 *      201:
 *        description: Created
 */
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    isAdmin: false,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN
/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *    - user
 *    summary: Login
 *    description: Login
 *    parameters:
 *    - in: body
 *      email: string
 *      password: string
 *      schema:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            minLength: 6
 *            default: "user@mail.com"
 *          password:
 *            type: string
 *            minLength: 8
 *            default: "test1234"
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).json({
      message: "Invalid credentials",
      isLoginSuccessful: false,
    });
  }

  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(200).json({
      message: "Invalid credentials",
      isLoginSuccessful: false,
    });

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).json({
    message: "Login successful",
    isLoginSuccessful: true,
    token: token,
    isAdmin: user.isAdmin,
  });
});

module.exports = router;
