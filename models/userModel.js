const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    profilePicture: {
      type: String, // path to image
      default: ""
    },
    role: {
    type: String,
    enum: ["user", "author"],
    default: "user",
}

});

module.exports = mongoose.model("User", userModel);
