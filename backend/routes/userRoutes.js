const express = require('express');
const { registerUser, authUser, updateUser, verifyEmail, forgotPassword, resetPassword } = require('../controllers/userControllers');
const { protect, isResetTokenValid } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/").post(registerUser);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(authUser);
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(isResetTokenValid, resetPassword)
router.route("/verify-token").get(isResetTokenValid, (req, res) => {
    res.json({ success: true })
})
router.route("/profile").post(protect, updateUser)



module.exports = router;