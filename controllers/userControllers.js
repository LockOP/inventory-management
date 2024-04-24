// routes/users.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../configs/databaseSetup");

// User Registration
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // following code is for hashing password - the hashed assword should come from frontend, below is just a help for creating one while development
    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: passwordHashed,
    });
    res.status(201).json({ message: "User registered successfully" });
    console.log("User registered:", user.id);
  } catch (error) {
    console.error({
      name: error.name,
      details: error.errors,
    });
    res.status(500).json({
      error: "Internal server error",
      name: error.name,
      details: error.errors,
    });
  }
};

// User Login
const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete User // DEV PURPOSE ONLY
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.destroy({ where: { id: userId } });
    if (deletedUser === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, logIn, deleteUser };
