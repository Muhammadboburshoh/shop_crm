const { row, rows } = require('../utils/db');

module.exports = class Product {
  constructor(
    prodId,
    prodItemId,
    name,
    barcode,
    count,
    original_price,
    markup_price,
    description
  ) {
    this.prodId = prodId;
    this.prodItemId = prodItemId;
    this.name = name;
    this.barcode = barcode;
    this.count = count;
    this.original_price = original_price;
    this.markup_price = markup_price;
    this.description = description;
  }

  save() {
    if (this.prodId) {
      const productEditSql = `
        select update_product(
            $1, $2, $3, $4, $5, $6, $7, $8
          )
      `;
      return row(
        productEditSql,
        this.prodId,
        this.prodItemId,
        this.name,
        this.barcode,
        this.count,
        this.original_price,
        this.markup_price,
        this.description
      );
    } else {
      const productAddSql = `select add_product($1, $2, $3, $4, $5, $6)`;
      return row(
        productAddSql,
        this.name,
        this.barcode,
        this.count,
        this.original_price,
        this.markup_price,
        this.description
      );
    }
  }

  static fetchAllShopping(search, page, limit) {
    if (!search) {
      const allProductsSql = `
        select * from products_for_sale($1, $2)
      `;
      return rows(allProductsSql, page, limit);
    } else {
      const allProductsSql = `
        select * from searching_products_for_sale($1, $2, $3)
      `;
      return rows(allProductsSql, search, page, limit);
    }
  }

  static fetchAll(search, page, limit) {
    if (!search) {
      const allProductsSql = `
        select * from all_products($1, $2)
      `;
      return rows(allProductsSql, page, limit);
    } else {
      const allProductsSql = `
        select * from searching_products($1, $2, $3)
      `;
      return rows(allProductsSql, search, page, limit);
    }
  }

  static count(search) {
    if (!search) {
      return row(`select count(*) as product_count from products`);
    } else {
      return row(
        `select * from search_products_count($1) as product_count`,
        search
      );
    }
  }

  static findById(prodId, prodItemId) {
    if (prodItemId) {
      const findProductSql = `
        select * from find_product_details($1, $2)
      `;
      return row(findProductSql, prodId, prodItemId);
    } else {
      const findProductSql = `
        select * from find_product($1)
      `;
      return row(findProductSql, prodId);
    }
  }

  static deleteById(prodId, prodItemId) {
    if (prodId) {
      const deleteProductSql = `
        delete from products
        where
          id = $1
      `
      return row(deleteProductSql, prodId)
    } else if(prodItemId) {
      const deleteProductItemSql = `
        delete from product_items
        where
          id = $1
      `
      return row(deleteProductItemSql, prodItemId)
    }
  }
};
