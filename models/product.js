const { row, rows } = require('../utils/db');

module.exports = class Product {
  constructor(name, barcode, count, original_price, markup_price, description) {
    this.name = name;
    this.barcode = barcode;
    this.count = count;
    this.original_price = original_price;
    this.markup_price = markup_price;
    this.description = description;
  }

  save() {
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

  static fetchAll(search, page, limit) {
    if(!search) {
      const allProductsSql = `
        select * from all_products($1, $2)
      `;
      return rows(allProductsSql, page, limit);
    } else {
      const allProductsSql = `
        select * from search_products($1, $2, $3)
      `;
      return rows(allProductsSql, search, page, limit);
    }
  }

  static count(search) {
    if(!search) {
      return row(`select count(*) as product_count from products`);
    } else {
      return row(`select * from search_products_count($1) as product_count`, search)
    }
  }
};