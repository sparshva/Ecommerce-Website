const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter a valid email address");
      }
    },
  },
  phone: {
    type: Number,
    required: [true, "Please enter a valid phone number"],
    min: [1000000000, "Phone number must be at of least 10 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minLength: [8, "Password must be at least 8 characters"],
  },
  confirmpassword: {
    type: String,
    required: [true, "Please enter a valid password"],
    minLength: [8, "Password must be at least 8 characters"],
  },
  role: {
    type: String,
    default: "user",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    }

    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
