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

const prefix = "/collections";

inventoryRouter.post(prefix, createCollectionItem); // creqte collection

inventoryRouter.post("/collectionItems", createCollectionItem); // creqte collection item

inventoryRouter.post(prefix + "/:id/items", addItemToCollection); // add item to collection

inventoryRouter.delete(prefix + "/:collectionId/items/:itemId", removeItemFromCollection); // remove item from collection

inventoryRouter.get("/users/:userId/collections", listUserCollections);
inventoryRouter.get(prefix + "/:id/items", listItemsInCollection);
inventoryRouter.delete(prefix + "/:id", deleteCollection);

module.exports = { inventoryRouter };
