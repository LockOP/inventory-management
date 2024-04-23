// models/User.js

const { Sequelize, DataTypes } = require("sequelize");

const UserSchema = {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.fn("now") },
  updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.fn("now") },
};

module.exports = UserSchema;
