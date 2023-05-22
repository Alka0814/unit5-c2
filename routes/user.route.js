const express = require("express");
const { UserModel } = require("../model/user.model");
const bycrypt = require("bcrypt");
userRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const redis = require("redis");
const redisClient=redis.createClient(6379,"127.0.0.1")

redisClient.connect();


// post route to register or signup  the user
redisClient.on("connect",()=>{
console.log("connected to redis")
})

userRouter.post("/signup", async (req, res) => {
    const { email, password ,role} = req.body;
  
    try {
      const UserPresent = await UserModel.findOne({ email });
  
      if (UserPresent) {
        res.status(200).send({ Message: "User already exist, please login" });
      }
      const HashPassword = await bycrypt.hash(password, 12);
      const NewUser = new UserModel({
        email,
        password: HashPassword,
        role
      });
  
      await NewUser.save();
  
      res.status(200).send({ Message: "Save Successfully" });
    } catch (err) {
      res.status(404).send(err);
    }
  });




  userRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const isUserPresent = await UserModel.findOne({ email });
      if (!isUserPresent) {
        // user not present
        return res.status(400).send({ msg: "Not a user, please signup again " });
      }
  
      const isPasswordCorrect =bycrypt.compareSync(
        password,
        isUserPresent.password
      );
      if (!isPasswordCorrect)
        return res.status(400).send({ msg: "Wrong credentials" });
      // generate tokens
  
      // accessTOken and refreshTOken
      const accessToken = jwt.sign(
        { "userID":isUserPresent._id},
        process.env.NormalToken,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { "userID":isUserPresent._id},
        process.env.RefreshToken,
        { expiresIn: "5m" }
      );
      // store these tokens
      // cookies set a cookie



      res.send({"accessToken":accessToken,"refreshToken":refreshToken})
    
      res.send({ msg: "Login success" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  });


module.exports={userRouter}