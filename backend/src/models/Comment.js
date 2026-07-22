import{ mongoose } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "El campo text es obligatorio"],
      trim: true
    },

    is_visible: {
      type: Boolean,
      required: [true, "El campo is_visible es obligatorio"],
    },

    user_nickname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El campo user_nickname es obligatorio"],
      trim: true
    },

    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "El campo post_id es obligatorio"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);