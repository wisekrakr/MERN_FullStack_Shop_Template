const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "Please enter category value"],
    unique: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
