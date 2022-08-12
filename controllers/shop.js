const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
  const username = req.cookies.__auth.user.login;

  try {
    const products = await Product.fetchAll();

    res.render('shop/product-list', {
      pageTitle: 'Home',
      path: '/',
      username: username,
      products: products
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
