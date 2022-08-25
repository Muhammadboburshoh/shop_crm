const { row, rows } = require('../utils/db');

module.exports = class Order {
  constructor(prodId, prodItemId, count, userId) {
    this.prodId = prodId;
    this.prodItemId = prodItemId;
    this.count = count;
    this.userId = userId;
  }

  save() {
    if (this.prodId) {
      const orderInsertSql = `
        select add_order($1, $2, $3, $4)
      `;
      return row(
        orderInsertSql,
        this.prodId,
        this.prodItemId,
        this.count,
        this.userId
      );
    }
  }

  static fetchAll(search, page, limit) {}

  static count(search) {}

  static findById(prodId, prodItemId) {}

  static deleteById(prodId, prodItemId) {}
};
