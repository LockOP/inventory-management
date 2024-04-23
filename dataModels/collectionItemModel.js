// collectionItemModel.js
const { DataTypes } = require("sequelize");

const CollectionItemSchema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

module.exports = CollectionItemSchema;
