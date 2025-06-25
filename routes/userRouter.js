const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/userAuth");
const upload = require("../middleware/uploadUserProfile");
const checkAdmin = require("../middleware/checkAdmin");

const {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  uploadUserProfileImage,
  updateUserRole 
} = require("../controllers/userController");

// Get all users (protected)
router.get("/", verifyToken, getAllUsers);

// Get user by ID (protected)
router.get("/:id", verifyToken, getUserById);

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Upload profile image (protected)
router.patch(
  "/:id/upload-profile-picture",
  verifyToken,
  upload.single("profileImage"),
  uploadUserProfileImage
);

// Update user role (only admin)
router.patch("/:id/role", verifyToken, checkAdmin, updateUserRole);

module.exports = router;