const express= require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app= express();
const authroute= require("./routes/Auth");
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Posts");

app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("connected to mongodb")).catch((err)=>{
    console.log("error connecting to mongodb" + err);
});

app.use("/api/auth",authroute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.listen(5000,()=>{
    console.log("backend is running");
});
