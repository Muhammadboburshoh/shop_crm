const Product = require('../models/product');

const ITEMS_PER_PAGE = 2;

exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const username = req.cookies.__auth.user.login;

  try {
    const { product_count } = await Product.count();
    const products = await Product.fetchAll(page, ITEMS_PER_PAGE);

    res.render('shop/product-list', {
      pageTitle: 'Home',
      path: '/',
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
