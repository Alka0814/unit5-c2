const mongoose=require("mongoose")
 const ProductSchema=mongoose.Schema({
    title:String,
    description: String,
    userID:String
 });
 const ProductModel=mongoose.model("Product",ProductSchema);
 module.exports={
    ProductModel
 }