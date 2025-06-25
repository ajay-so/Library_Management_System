const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const User = require("../models/userModel");
const applyPagination = require("../utils/pagination");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all users with pagination & filter
const getAllUserService = async (query = {}) => {
  try {
    const { page = 1, limit = 5, username } = query;

    const filter = {};
    if (username) {
      filter.username = new RegExp(username, "i");
    }

    let dbQuery = User.find(filter);
    dbQuery = applyPagination(dbQuery, page, limit);

    const users = await dbQuery;
    const total = await User.countDocuments(filter);

    return {
      total,
      page: Number(page),
      limit: Number(limit),
      users,
    };
  } catch (error) {
    console.error("getAllUserService ERROR:", error);
    throw new Error("Error fetching users: " + error.message);
  }
};

// Get single user by ID
const getUserByIdService = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("getUserByIdService ERROR:", error);
    throw new Error("Error fetching user by ID: " + error.message);
  }
};

// Register a new user
const registerUserService = async (userData) => {
  try {
    const { username, email, password } = userData;
    if (!username || !email || !password)
      throw new Error("All fields are required");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    console.error("registerUserService ERROR:", error);
    throw new Error("Error registering user: " + error.message);
  }
};

// Login and generate token
const loginUserService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials (user not found)");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid credentials (wrong password)");

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role, // Include user role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  } catch (error) {
    console.error("loginUserService ERROR:", error);
    throw new Error("Error logging in user: " + error.message);
  }
};

// Upload or update profile picture
const uploadProfilePictureService = async (userId, filePath) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: filePath },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found or update failed");
    return updatedUser;
  } catch (error) {
    console.error("uploadProfilePictureService ERROR:", error);
    throw new Error("Error uploading profile picture: " + error.message);
  }
};

// Update user role (admin only)
const updateUserRoleService = async (userId, newRole) => {
  try {
    const allowedRoles = ["user", "author", "admin"];
    if (!allowedRoles.includes(newRole)) {
      throw new Error("Invalid role");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("updateUserRoleService ERROR:", error);
    throw new Error("Error updating user role: " + error.message);
  }
};

module.exports = {
  getAllUserService,
  getUserByIdService,
  registerUserService,
  loginUserService,
  uploadProfilePictureService,
  updateUserRoleService, // exported new service
};