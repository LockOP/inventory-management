const express = require("express");
const {
  createCollection,
  addItemToCollection,
  removeItemFromCollection,
  listUserCollections,
  listItemsInCollection,
  deleteCollection,
  createCollectionItem,
} = require("../controllers/inventoryControllers");

const inventoryRouter = express.Router();

inventoryRouter.post("/", createCollection); // crete collection
inventoryRouter.post("/collectionItems", createCollectionItem); // create collection item
inventoryRouter.post("/:collectionId/items/:itemId", addItemToCollection); // add item to collection

inventoryRouter.get("/", listUserCollections); // get all collections for user
inventoryRouter.get("/:collectionId/items", listItemsInCollection); // get all items for collections

inventoryRouter.delete( "/:collectionId/items/:itemId", removeItemFromCollection); // remove item from collection
inventoryRouter.delete("/:collectionId", deleteCollection); // 

module.exports = { inventoryRouter };
