// models/User.js

const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.fn("now") },
    updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.fn("now") },
  });

  User.sync() // if user table doesn't exist, create it
    .then(() => {
      console.log('The "Users" table has been created successfully.');
    })
    .catch((error) => {
      console.error('Error creating the "Users" table:', error);
    });

  return User;
};
