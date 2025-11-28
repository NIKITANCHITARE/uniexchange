const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: String,
  price: String,
  category: String,
  image: String, // file path
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

module.exports = mongoose.model("Material", materialSchema);
