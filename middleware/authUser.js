// middleware/authenticate.js

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../configs/databaseSetup");

const authenticateUser = async (req, res, next) => {
  
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = user.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateUser;
