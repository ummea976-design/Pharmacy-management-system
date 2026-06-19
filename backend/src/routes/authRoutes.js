const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
  refreshToken,
  updateDetails,
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/auth");

router.post("/register", protect, authorize("ADMIN"), register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.post("/logout", protect, logout);
router.post("/refresh", protect, refreshToken);

module.exports = router;
