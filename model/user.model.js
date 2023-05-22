const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    email:String,
    password:String,
    role:{
        type:String,
        default:"Seller",
        enum:["seller"]
    }
});
 const UserModel=mongoose.model("user",UserSchema);

 module.exports={
    UserModel
 }