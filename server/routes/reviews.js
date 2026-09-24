const router = require('express').Router();
const controller = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/auth');
router.post('/:productId', authenticate, controller.create);
router.post('/products/:productId', authenticate, controller.create);
module.exports = router;
