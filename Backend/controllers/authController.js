const User = require("../models/User");

/* ===========================
   LOGIN (ADMIN + WORKER)
   =========================== */
exports.login = async (req, res) => {
  try {
    const { userId, nic } = req.body;

    if (!userId || !nic) {
      return res.status(400).json({
        message: "User ID and NIC are required"
      });
    }

    const user = await User.findOne({ userId, nic });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Create session
    req.session.user = {
      id: user._id,
      userId: user.userId,
      user_type: user.user_type
    };

    res.status(200).json({
      message: "Login successful",
      user_type: user.user_type
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.getMe = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    user: req.session.user
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("buildsafe.sid");
    res.json({ message: "Logged out" });
  });
};