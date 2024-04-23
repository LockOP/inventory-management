const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Collection = sequelize.define("Collection", {
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
  });

  const CollectionItem = sequelize.define("CollectionItem", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Collection.hasMany(CollectionItem, {
    foreignKey: "CollectionId", // This should point to the primary key of Collection
    as: "collectionItems",
  });

  CollectionItem.belongsTo(Collection, {
    foreignKey: "CollectionId", // This should point to the primary key of Collection
    as: "collection",
  });

  sequelize.sync({ force: true });

  return { Collection, CollectionItem };
};
