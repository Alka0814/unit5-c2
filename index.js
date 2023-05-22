const express=require('express');


const { userRouter } = require("./routes/user.route");
const {ProductRouter } = require("./routes/product.route");
const {LogoutRouter } = require("./routes/logout.route");
const {RefreshRouter } = require("./routes/refresh.route");
const { connection } = require("./configs/db");


const app=express();
app.use(express.json())
require("dotenv").config()
// app.use(cors())


app.use("/users", userRouter);

app.use("/products", ProductRouter);

app.use("/logout", LogoutRouter);

app.use("/refresh",  RefreshRouter);








app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connected to MongoDb");
    } catch (err) {
      console.log("Not able to connected to MongoDb");
      console.log(err);
    }
  
    console.log(`Server is running on ${process.env.port}`);
  });