const {
  getAllUserService,
  registerUserService,
  loginUserService,
  getUserByIdService,
  uploadProfilePictureService,
  updateUserRoleService // new service added
} = require("../services/userService");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUserService(req.query);
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    res.status(200).json({ message: "User logged in successfully", ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload or update user profile picture
const uploadUserProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.params.id;
    const filePath = req.file.path.replace(/\\/g, "/"); // For Windows compatibility

    const updatedUser = await uploadProfilePictureService(userId, filePath);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile uploaded successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    const updatedUser = await updateUserRoleService(userId, role);

    res.status(200).json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Role update failed", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  uploadUserProfileImage,
  updateUserRole,
};