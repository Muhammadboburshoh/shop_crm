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
};
