// Logout user and blacklist token
const express = require("express");
const { BlacklistModel } = require("../model/blacklist.model");

LogoutRouter = express.Router();

LogoutRouter.post("/logout", async (req, res) => {
  try {
    // Add token to blacklist collection
    const token = req.headers.authorization;
    const blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();

    res.status(200).send("Logged out successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = { LogoutRouter };
