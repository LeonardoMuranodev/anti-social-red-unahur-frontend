const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El campo name es obligatorio"],
      trim: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", TagSchema);