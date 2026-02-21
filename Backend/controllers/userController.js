const User = require("../models/User");

/* =====================================================
   ADD USER (ADMIN / WORKER)
   ===================================================== */
exports.addUser = async (req, res) => {
  try {
    const { userId, name, nic, password, user_type, helmet} = req.body;

    // ---- BASIC VALIDATION ----
    if (!userId || !name || !nic || !user_type || !password || !helmet) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // Validate user type
    if (!["ADMIN", "WORKER"].includes(user_type)) {
      return res.status(400).json({
        message: "Invalid user type"
      });
    }

    // Prevent duplicate users
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    // ---- CREATE USER ----
    const user = await User.create({
      userId, // TODO: shuld be changed
      name,
      nic,
      password,
      user_type,
      helmet: null
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    console.error("Add user error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
