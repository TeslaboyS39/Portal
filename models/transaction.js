'use strict';
const { formatRupiah } = require('../helpers/amountFormatter');
const { formatDate } = require('../helpers/dateFormatter');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    formattedAmount() {
      return formatRupiah(this.amount);
    }

    formattedDate() {
      return formatDate(this.transactionDate);
    }

    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Category)
    }
  }
  Transaction.init({
    transactionName: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    transactionType: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};