const express = require("express");

RefreshRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

RefreshRouter.get("/", async (req, res) => {
  const refreshtoken = req.headers.authorization;
  const decoded = jwt.verify(refreshtoken, process.env.RefreshToken);

  if (decoded) {
    const token = jwt.sign(
      { userID: decoded.userID },
      process.env.NormalToken,
      { expiresIn: "5m" }
    );
    return res.send(token);
  } else {
    res.send("invalid refresh token, plz login again");
  }
});

module.exports = { RefreshRouter };





