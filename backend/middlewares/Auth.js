const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_cookie;

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: verify._id });

    req.token = token;
    req.user = user;
    // console.log(user);

    next();
  } catch (error) {
    res.send(error);
  }
};

const userCheck = async (req, res, next) => {
  try {
    const role = req.user.role;

    if (role == "admin") {
      next();
    }
  } catch (error) {
    res.log(error);
  }
};

module.exports = { userAuth, userCheck };
