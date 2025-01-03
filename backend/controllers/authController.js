const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authController = {};

function generateToken(user) {
  return jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

function formatUserResponse(user) {
  return {
    id: user._id,
    username: user.username,
    role: user.role,
    avatar: user.avatar,
  };
}

function handleAuthError(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

function generateAvatar(username) {
  const formattedName = encodeURIComponent(username);
  return `https://ui-avatars.com/api/?name=${formattedName}&size=128&background=random&color=fff&length=2&font-size=0.4&rounded=true`;
}

authController.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const avatarUrl = generateAvatar(username);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return handleAuthError(res, 400, "Username already taken");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const trimmedRole = typeof role === "string" ? role.trim().toLowerCase() : "";
    const validRoles = ["participant", "organizer"];
    const userRole = validRoles.includes(trimmedRole) ? trimmedRole : "participant";

    const newUser = new User({
      username,
      passwordHash,
      role: userRole,
      avatar: avatarUrl,
    });

    await newUser.save();

    const token = generateToken(newUser);
    const formattedUser = formatUserResponse(newUser);

    res.status(201).json({
      token,
      user: formattedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return handleAuthError(res, 400, "Invalid credentials");
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return handleAuthError(res, 400, "Invalid credentials");
    }

    const token = generateToken(user);
    const formattedUser = formatUserResponse(user);

    res.json({
      token,
      user: formattedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

authController.logout = async (req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authController;
