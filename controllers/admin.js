const Product = require('../models/product');

const ITEMS_PER_PAGE = 5;

exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  let search = req.query.search || null;
  const username = req.cookies.__auth.user.login;
  search = search ? search.trim() : search;

  try {
    const { product_count } = await Product.count(search);
    const products = await Product.fetchAll(search, page, ITEMS_PER_PAGE);

    res.render('admin/all-products', {
      pageTitle: 'All Products',
      path: '/products',
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

exports.getAddProduct = (req, res, next) => {
  const username = req.cookies.__auth.user.login;
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    username: username,
    editing: false,
    prodCreateing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const username = req.cookies.__auth.user.login;
  const { name, barcode, count, original_price, markup_price } = req.body;
  const description = req.body.description ? req.body.description : null;
  const status = req.body.status ? 'A' : 'I';

  try {
    const product = new Product(
      null,
      null,
      name,
      barcode,
      count,
      original_price,
      markup_price,
      description,
      status
    );
    const result = await product.save();
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/add-product',
      username: username,
      editing: false,
      prodCreateing: true
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const username = req.cookies.__auth.user.login;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/products');
  }

  const prodId = req.query.p_id;
  const prodItemId = req.query.pi_id;
  try {
    const product = await Product.findById(prodId, prodItemId);
    if (!product) {
      return res.redirect('/products');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Products',
      path: '/edit-product',
      username: username,
      editing: editMode,
      product: product,
      prodCreateing: false
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const username = req.cookies.__auth.user.login;
  const { name, barcode, count, original_price, markup_price, prodId } =
    req.body;
  const prodItemId = req.body.prodItemId ? req.body.prodItemId : 0;
  const description = req.body.description ? req.body.description : null;
  const status = req.body.status ? 'A' : 'I';

  try {
    const product = new Product(
      prodId,
      prodItemId,
      name,
      barcode,
      count,
      original_price,
      markup_price,
      description,
      status
    );

    await product.save();

    res.render('201', {
      pageTitle: 'Successful',
      path: '/successful',
      username: username
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.prodId ? req.body.prodId : null;
  const prodItemId = req.body.prodItemId ? req.body.prodItemId : null;
  const currentPage = req.body.currentPage;

  try {
    const result = await Product.deleteById(prodId, prodItemId);

    res.redirect(`/products?page=${currentPage}`);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
