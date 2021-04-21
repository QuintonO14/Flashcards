const express = require("express");
const router = express.Router();
const Collection = require("../../models/Collections");
const auth = require("../../middleware/auth");

//Get All Cards
router.get("/", [auth], async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user.id });
    return res.json(collections);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new card to array
router.post("/", [auth], async (req, res) => {
  try {
    const newCollection = new Collection({
      name: req.body.name,
      cards: req.body.cards,
      user: req.user.id,
    });

    const collection = await newCollection.save();

    res.json(collection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get Collections By Id
router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.json(collection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    await collection.remove();
    res.json({ msg: "Collection removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
