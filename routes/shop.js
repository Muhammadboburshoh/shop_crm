const router = require('express').Router();

const shopController = require('../controllers/shop');
const is_auth = require('../middleware/is-auht');

router.get('/', is_auth, shopController.getProducts);

module.exports = router;
