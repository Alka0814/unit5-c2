const jwt = require("jsonwebtoken");


const { UserModel } = require("../model/user.model");
const { BlacklistModel } = require("../model/blacklist.model");
require("dotenv").config();


const authenticate = async (req, res, next) => {
  try {
    const maintoken = req.headers.authorization;
    // const token = req.cookies.token;
   
    const isTokenBlacklisted = await BlacklistModel.findOne({ token: maintoken });
    // console.log(isTokenBlacklisted)

    if (isTokenBlacklisted){
      
      return res.status(400).send({ msg: "Please login..." });

    }else{
     
    const decodedToken = jwt.verify(maintoken, process.env.NormalToken);
    const { userID } = decodedToken;
    req.body.userID=decodedToken.userID

    // Check if the user exists
    const user = await UserModel.findById(userID);
    const role=user?.role
       req.role=role

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

   

    next();
  }
  } catch (error) {
    res.send({ msg: "Access Token is Expired" });
  }
};
module.exports = { authenticate };
