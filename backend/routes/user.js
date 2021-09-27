const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/signup", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    //save user and send response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
});

//login
router.get("/login", async (req, res) => {
  try {
    //find user
    let success=false;
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Wrong Credentials");
    }

    //validate password
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
      res.status(400).json("Wrong Credentials");
    }

    success=true;
    //send res
    res.status(200).json({success,user});
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
});

//login

module.exports = router;
