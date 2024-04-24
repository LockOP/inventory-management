const sequelize = require("../configs/databaseConnect");
const CollectionItemSchema = require("../dataModels/collectionItemModel");
const CollectionSchema = require("../dataModels/collectionModel");
const UserSchema = require("../dataModels/userModel");

const db = {};

db.sequelize = sequelize;
db.sequelize.sync({ force: false, alter: true });

db.User = sequelize.define("User", UserSchema);
db.Collection = sequelize.define("Collection", CollectionSchema);
db.CollectionItem = sequelize.define("CollectionItem", CollectionItemSchema);

db.User.sync({ force: false, alter: true });
db.Collection.sync({ force: false, alter: true });
db.CollectionItem.sync({ force: false, alter: true });

db.Collection.hasMany(db.CollectionItem);
db.CollectionItem.belongsTo(db.Collection);

module.exports = db;
