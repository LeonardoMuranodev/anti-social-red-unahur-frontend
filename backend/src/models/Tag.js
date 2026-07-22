import{ mongoose } from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El campo name es obligatorio"],
      trim: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tag", tagSchema);