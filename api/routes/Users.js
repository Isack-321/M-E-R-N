const router= require("express").Router();
const User= require("../model/User");
const post= require("../model/Post");
const bcrypt= require("bcrypt");


//Update User
router.put("/:id", async(req, res)=>{
    if(req.body.userId === req.params.id){
         if(req.body.password){
            const salt= await bcrypt.genSalt(10);
            req.body.password= await bcrypt.hash(req.body.password,salt);

         }
         try {
             const updatedUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                });
                res.status(200).json(updatedUser);
         } catch (error) {
             res.status(500).json(error);
         } 
         }
         else {
            res.status(401).json("You can only update your account");
    }
});

//delete
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id);
        try{
            await post.deleteMany({username: user.username});
            await User.findByIdAndDelete(req.params.id);
        } catch (error) {
            res.status(500).json(error);
        }
       
    }
    catch (err) {
        res.status(404).json("User not found!");
      }
    }  else {
        res.status(401).json("You can delete only your account!");
      }
});

//GET USER
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json("user not found" + " " + err);
    }
  });
  
  module.exports = router;