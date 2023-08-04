'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserDetail.belongsTo(models.User)
      UserDetail.belongsTo(models.User, {
        foreignKey: 'id',
      });
    }
  }
  UserDetail.init({
    userName: DataTypes.STRING,
    userProfilePicture: DataTypes.STRING,
    userBirthDate: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};