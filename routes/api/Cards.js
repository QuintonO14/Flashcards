const express = require("express");
const router = express.Router();
const Card = require("../../models/Cards");
const Collection = require("../../models/Collections");
const auth = require("../../middleware/auth");
//Get All Cards
router.get("/", [auth], async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id });
    return res.json(cards);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new card to array
router.post("/", [auth], async (req, res) => {
  try {
    const newCard = new Card({
      question: req.body.question,
      answer: req.body.answer,
      user: req.user.id,
    });

    const card = await newCard.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete Card by ID
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    await card.remove();
    await Collection.updateMany({"$pull" : { cards : {_id : req.params.id}}});
    res.json({ msg: "Card removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
