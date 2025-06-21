const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
