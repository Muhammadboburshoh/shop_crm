const router = require('express').Router();

const adminController = require('../controllers/admin');
const is_auth = require('../middleware/is-auht');


router.get('/add-product', is_auth, adminController.getAddProduct);
router.post('/add-product', is_auth, adminController.postAddProduct);

module.exports = router;
