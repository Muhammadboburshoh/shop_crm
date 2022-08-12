const Product = require('../models/product');

const ITEMS_PER_PAGE = 2;

exports.getAddProduct = (req, res, next) => {
  const username = req.cookies.__auth.user.login;
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: 'admin/add-product',
    username: username,
    editing: false,
    prodCreateing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const username = req.cookies.__auth.user.login;
  const { name, barcode, count, original_price, markup_price } = req.body;
  const description = req.body.description ? req.body.description : null;

  try {
    const product = new Product(
      name,
      barcode,
      count,
      original_price,
      markup_price,
      description
    );
    const result = await product.save();

    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: 'admin/add-product',
      username: username,
      editing: false,
      prodCreateing: true
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const username = req.cookies.__auth.user.login;

  try {
    const { product_count } = await Product.count();
    const products = await Product.fetchAll(page, ITEMS_PER_PAGE);

    res.render('admin/all-products', {
      pageTitle: 'All Products',
      path: 'admin/products',
      username: username,
      products: products,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < product_count,
      hasPerviousPage: page > 1,
      nextPage: page + 1,
      perviousPage: page - 1,
      lastPage: Math.ceil(product_count / ITEMS_PER_PAGE)
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};