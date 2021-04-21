const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  cards: {
    type: Array,
  },
});

module.exports = mongoose.model("Collections", CollectionSchema);
