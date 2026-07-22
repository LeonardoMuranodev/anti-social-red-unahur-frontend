import{ mongoose } from "mongoose";

const postImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "El campo url es obligatorio"],
      trim: true
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
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
    images: [PostImageSchema],
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);