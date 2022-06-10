const express= require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app= express();
const authroute= require("./routes/Auth");
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
app.use(express.json());

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("connected to mongodb")).catch((err)=>{
    console.log("error connecting to mongodb" + err);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  
app.use("/api/auth",authroute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories",categoryRoute)
app.listen(5000,()=>{
    console.log("backend is running");
});
