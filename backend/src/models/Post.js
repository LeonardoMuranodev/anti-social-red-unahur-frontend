const mongoose = require("mongoose");

const PostImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "El campo url es obligatorio"],
      trim: true
    },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    user_nickname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El campo user_nickname es obligatorio"],
      trim: true
    },
    text: {
        type: String,
        required: [true, "El campo text es obligatorio"],
        trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imagenes: [PostImageSchema],
    etiquetas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);