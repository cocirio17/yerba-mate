const router = require('express').Router();
const controller = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');
router.get('/me', authenticate, controller.me);
module.exports = router;
