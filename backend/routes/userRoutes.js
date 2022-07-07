const express = require("express");
const router = new express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth, userCheck } = require("../middlewares/Auth");
const sendEmail = require("../sendEmail/sendEmail");

//*******************************************************REGISTRATION********************************************************
router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const checkemail = await User.findOne({ email: email });
    if (checkemail) {
      res.status(400).send("User already exists!");
    } else {
      const password = req.body.password;
      const confirmpassword = req.body.confirmpassword;

      if (password != confirmpassword) {
        res.status(400).send("Please enter same passwords");
      }

      const hpassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        role: req.body.role,
      });
      const token = await user.generateAuthToken();

      res.cookie("jwt_cookie", token, {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        httpOnly: true,
      });

      const createUser = await user.save();

      res.status(200).send(createUser);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//***************************************************************LOGIN***********************************************************
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.status(400).send("Please fill all the required fields");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("No user found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = await user.generateAuthToken();
      res.cookie("jwt_cookie", token, {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        httpOnly: true,
      });
      res.status(200).send(user);
    } else {
      res.status(401).send("Invalid Login Details");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//*************************************************************LOGOUT**************************************************************
router.get("/logout", userAuth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token != req.token;
    });
    res.clearCookie("jwt_cookie");
    req.user.save();

    res.status(200).send("successfully logged out");
  } catch (error) {
    res.status(400).send(error);
  }
});

//**************************************************************UPDATE-A-USER*******************************************************
router.put("/myprofile/update", userAuth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      res.status(404).send("No user found");
    }

    user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

/******************************************************************UPDATE-USER-ADMIN****************************************************************/
router.put("/user/:id", userAuth, userCheck, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(404).send("No user found");
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

/********************************************************************DELETE-USER-ADMIN*************************************************************/
router.delete("/user/:id", userAuth, userCheck, async (req, res) => {
  try {
    // console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).send("User not found");
    }
    // console.log(req.params.id);
    const deleteduser = await User.findByIdAndDelete(req.params.id, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
    // console.log(deletedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

/****************************************************************UPDATE-PASSWORD****************************************************/
router.put("/myprofile/updatepassword", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const isPasswordMatch = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!isPasswordMatch) {
      res.status(401).send("Old Password does not match");
    }

    if (req.body.newPassword != req.body.confirmNewPassword) {
      res.status(400).send("Passwords do not match");
    }

    user.password = req.body.newPassword;
    user.confirmpassword = req.body.newPassword;

    const newuser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//************************************************************GET-ALL-USERS******************************************************* */
router.get("/users", userAuth, userCheck, async (req, res) => {
  try {
    const users = await User.find();
    const userCount = await User.countDocuments();

    res.status(200).json({
      success: true,
      users,
      userCount,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//************************************************************GET-A-SINGLE-USER********************************************************** */
router.get("/user/:id", userAuth, userCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("user not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

/******************************************************************GET-USER-DETAILS**************************************************** */
router.get("/me", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//********************************************************POST-FORGOT-PASSWORD************************************************
router.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("No user found");
    }

    const passkey = process.env.PASS_KEY + user.password;

    const token = jwt.sign({ _id: user._id }, passkey, {
      expiresIn: "10m",
    });

    const link = `http://localhost:3001/resetpassword/${user._id}/${token}`;
    await sendEmail({
      email: user.email,
      subject: "Change password email",
      message: `Your reset password is ${link}`,
    });

    res.status(200).json({
      message: `Password reset link has been sent to your email....`,
      token: token,
      id: user._id,
    });

    // res.status(200).send(`Password reset link has been sent to your email....`);
  } catch (error) {
    res.status(400).send(error);
  }
});

//********************************************************GET-RESET-PASSWORD*********************************************************
router.get("/reset-password/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send("Invalid id...");
    }
    console.log(token);
    const passkey = process.env.PASS_KEY + user.password;
    console.log(passkey);
    const verify = jwt.verify(token, passkey);
    console.log(verify);
    res.status(200).send("Welcome to reset password page");
  } catch (error) {
    res.status(400).send(error);
  }
});

//*********************************************************PUT-RESET-PASSWORD********************************************************
router.put("/reset-password/:id/:token", async (req, res) => {
  try {
    // console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    // console.log("found user");

    if (user) {
      const newPassword = req.body.newPassword;
      const confirmNewPassword = req.body.confirmNewPassword;
      if (newPassword !== confirmNewPassword) {
        res.status(400).send(" New passwords does not match ");
      }

      user.password = newPassword;
      user.confirmpassword = confirmNewPassword;
      const newUser = await user.save();
      // console.log("newUser");
      res.status(200).send("Password changed successfully");
    } else {
      res.status(400).send("Old password does not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
