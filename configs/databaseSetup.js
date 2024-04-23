const sequelize = require("../configs/databaseConnect");
const CollectionItemSchema = require("../dataModels/collectionItemModel");
const CollectionSchema = require("../dataModels/collectionModel");
const UserSchema = require("../dataModels/userModel");

const db = {};

db.sequelize = sequelize;
db.sequelize.sync({ force: false });

db.User = sequelize.define("User", UserSchema);
db.Collection = sequelize.define("Collection", CollectionSchema);
db.CollectionItem = sequelize.define("CollectionItem", CollectionItemSchema);

db.User.sync();
db.CollectionItem.sync();
db.CollectionItem.sync();

db.Collection.hasMany(db.CollectionItem);
db.CollectionItem.belongsTo(db.Collection);

module.exports = db;
