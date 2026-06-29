const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "El campo nickname es obligatorio"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "El campo password es obligatorio"],
      trim: true,
    },

    seguidores: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    seguidos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);