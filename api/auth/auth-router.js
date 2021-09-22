const router = require("express").Router();
const { getAllItems, insertItem, ownerPage } = require("../users/users-model");
// const User = require("../users/users-model");

router.get("/items", async (req, res) => {
  res.json(await getAllItems());
});

router.post("/newItem", async (req, res, next) => {
  const { owner_id, location, name, item_type, description, price } = req.body;
  try {
    const newItem = { owner_id, location, name, item_type, description, price };
    const item = await insertItem(newItem);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.get("/owner", async (req, res) => {
  res.json(await ownerPage());
});

module.exports = router;
