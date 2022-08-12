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

  static fetchAll(page, limit) {
    const allProductsSql = `
      select
        p.id,
        p.name,
        p.barcode,
        p.description,
        max(pi.markup_price) as markup_price,
        sum(pi.count) as count
      from
        products as p
        join product_items as pi on pi.product_id = p.id
      group by
        p.id,
        p.name,
        p.barcode,
        p.description
      order by
        p.id desc
      offset ($1 - 1) * $2 limit $2
    `;
    return rows(allProductsSql, page, limit);
  }

  static count() {
    return row(`select count(*) as product_count from products`);
  }
};
