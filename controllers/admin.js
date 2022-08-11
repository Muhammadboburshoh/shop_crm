const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  const username = req.cookies.__auth.user.login;
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: 'admin/add-product',
    username: username,
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { name, barcode, count, original_price, markup_price } = req.body;
  const description = req.body.description ? req.body.description : null;

  try {
    const product = new Product(name, barcode, count, original_price, markup_price, description);
    const result = await product.save();
    console.log(result);
    res.send("OK")
  } catch (e) {
    console.log(e);
  }
};
