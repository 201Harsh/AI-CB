const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      errors: error.array(),
    });
  }

  const { name, email, password } = req.body;

  try {
    const IsUser = await userModel.findOne({ email });
    if (IsUser) {
      return res.status(400).json({
        errors: "User already exist",
      });
    }

    const hashPassword = await userModel.hashPassword(password);

    const NewUser = await userService.createUser({
      name,
      email,
      password: hashPassword,
    });

    const token = NewUser.Jwt_Token();

    return res.status(200).json({
      message: "User created successfully",
      user: NewUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      errors: error.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const User = await userModel.findOne({ email });

    if (!User) {
      return res.status(400).json({
        errors: "Invalid credentials",
      });
    }

    const isMatch = await User.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        errors: "Invalid credentials",
      });
    }

    const token = User.Jwt_Token();

    return res.status(200).json({
      message: "Login successful",
      user: User,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
