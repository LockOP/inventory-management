const express = require("express");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routers/userRouters");
const authenticateUser = require("./middleware/authUser");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("inventory-backend");
  console.log("service triggered");
});

// check middleware
app.get("/check", authenticateUser, (req, res) => {
  res
    .status(201)
    .json({ message: "inventory-backend-middleware", userId: req.userId });
  console.log("middleware service triggered");
});

app.use("/api/users", userRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
