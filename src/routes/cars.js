const router = require('express').Router();

/**
 * @swagger
 * /cars:
 *  get:
 *    description: Get all cars list
 *    responses:
 *      200:
 *      description: Success
 */
router.get('/', (req, res) => {
    res.send([
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla'
        }
    ])
});

module.exports = router;