const router = require('express').Router();

const authController = require('../controllers/auth');
const is_auth = require('../middleware/is-auht');

router.post('/login', authController.postLogin);
router.get('/login', authController.getLogin);

module.exports = router;
