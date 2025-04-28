const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const BlackListedToken = require("../models/blackListedtoken.model");
const nodemailer = require("../config/nodemailer");

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

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    const hashPassword = await userModel.hashPassword(password);

    const MailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verification Code - Secure Your Account",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
        <style>
            body { margin: 0; padding: 0; background-color: #f5f7fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { max-width: 150px; margin-bottom: 20px; }
            .content { text-align: center; padding: 20px; }
            .otp-box { background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 30px 0; display: inline-block; font-size: 32px; font-weight: bold; color: #2a4e96; letter-spacing: 3px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .security-icon { width: 80px; margin: 20px auto; }
            .note { color: #666; font-size: 14px; line-height: 1.6; max-width: 80%; margin: 0 auto; }
            @media screen and (max-width: 600px) {
                .container { margin: 10px; padding: 20px; }
                .otp-box { font-size: 24px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://framerusercontent.com/images/g0YTRh7uRHpbWQgSZz62bO050.png" class="logo" alt="Company Logo">
                <h1 style="color: #1a237e; margin-bottom: 5px;">Account Verification</h1>
                <p style="color: #666;">Secure your account with one-time verification code</p>
            </div>
    
            <div class="content">
                <svg class="security-icon" viewBox="0 0 24 24" fill="#2a4e96">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                
                <p class="note">Please use the following verification code to complete your account security process for the email ${email}</p>
                <p class="note">Your verification code is:</p>

                <div class="otp-box">${otp}</div>
                
                <p class="note">This code will expire in 10 minutes. If you didn't request this code, please ignore this message or contact our support team.</p>
                
                <p class="note">Best regards,<br>The EndGaming AI Team | By ❤️ Harsh</p>
            </div>
    
            <div class="footer">
                <p>Need help? Contact us at <a href="mailto:support@yourcompany.com" style="color: #2a4e96; text-decoration: none;">endgamingai2@gmail.com</a></p>
                <p style="margin-top: 15px;">© ${new Date().getFullYear()} EndGaming AI. All rights reserved.</p>
                <p style="font-size: 10px; color: #999; margin-top: 10px;">This is an automated message, please do not reply directly.</p>
            </div>
        </div>
    </body>
    </html>`,
    };

    const info = await nodemailer.sendMail(MailOptions);

    const NewUser = await userService.createUser({
      name,
      email,
      password: hashPassword,
    });

    const token = NewUser.Jwt_Token();

    res.cookie("token", token),
      {
        httpOnly: true,
      };

    return res.status(200).json({
      message: "User created successfully",
      user: NewUser,
      token,
      otp,
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

    res.cookie("token", token),
      {
        httpOnly: true,
      };

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

module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (token) {
      const blacklistedToken = await BlackListedToken.create({ token });
    }
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getCredit = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      credit: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
