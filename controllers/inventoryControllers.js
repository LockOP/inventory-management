require("dotenv").config();
const { Collection, CollectionItem } = require("../configs/databaseSetup");

const createCollection = async (req, res) => {
  try {
    const {
      name,
      description,
      viewAccessType = "ALL",
      viewAccessTo = [],
    } = req.body;
    const userId = req.userId;

    const collection = await Collection.create({
      name,
      description,
      viewAccessType,
      viewAccessTo,
      UserId: userId,
    });
    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCollectionItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collectionItem = await CollectionItem.create({
      name,
      description,
      CollectionId: null,
    });
    res.status(201).json(collectionItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addItemToCollection = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const itemId = req.params.itemId;

    const collection = await Collection.findByPk(collectionId);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const collectionItem = await CollectionItem.findByPk(itemId);
    if (!collectionItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    await collectionItem.update({ CollectionId: collectionId });

    res.status(201).json({ message: "Item added to collection successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.name });
  }
};

const removeItemFromCollection = async (req, res) => {
  try {
    const { collectionId, itemId } = req.params;

    const collection = await Collection.findByPk(collectionId);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const item = await CollectionItem.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const collectionItem = await CollectionItem.findOne({
      where: { CollectionId: collectionId, id: itemId },
    });
    if (!collectionItem) {
      return res.status(404).json({
        error: "Collection item not found in the specified collection",
      });
    }

    await CollectionItem.destroy({
      where: { CollectionId: collectionId, id: itemId },
    });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const listUserCollections = async (req, res) => {
  try {
    const userId = req.userId;
    const collections = await Collection.findAll({
      where: { UserId: userId },
      include: CollectionItem,
    });
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const listItemsInCollection = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;

    const collection = await Collection.findByPk(collectionId);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const collectionItems = await CollectionItem.findAll({
      where: { CollectionId: collectionId },
    });
    res.json(collectionItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;

    const collection = await Collection.findByPk(collectionId);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    await CollectionItem.destroy({ where: { CollectionId: collectionId } });

    await collection.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCollection,
  createCollectionItem,
  addItemToCollection,
  removeItemFromCollection,
  listUserCollections,
  listItemsInCollection,
  deleteCollection,
};
