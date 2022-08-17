const Product = require('../models/product');

const ITEMS_PER_PAGE = 3;

exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  let search = req.query.search || null;
  const username = req.cookies.__auth.user.login;
  search = search ? search.trim() : search;

  try {
    const { product_count } = await Product.count(search);
    const products = await Product.fetchAllShopping(
      search,
      page,
      ITEMS_PER_PAGE
    );

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
      lastPage: Math.ceil(product_count / ITEMS_PER_PAGE),
      search: search
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
