const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

module.exports = mongoose.model("Cards", CardSchema);
