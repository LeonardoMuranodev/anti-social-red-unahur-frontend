import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);