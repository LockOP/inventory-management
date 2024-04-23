const { DataTypes } = require("sequelize");

const CollectionSchema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  viewAccessType: {
    type: DataTypes.ENUM("LIMITED", "HIDDEN", "ALL"),
    allowNull: false,
    defaultValue: "ALL",
  },
  viewAccessTo: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
};

module.exports = CollectionSchema;
