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
      subject: "Your Secure Access Code - Verify Your Account",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Secure Verification | EndGaming AI</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            body { 
                margin: 0; 
                padding: 0; 
                background-color: #111827; 
                font-family: 'Inter', sans-serif; 
                color: #f3f4f6;
            }
            .container { 
                max-width: 600px; 
                margin: 20px auto; 
                background: #1f2937; 
                border-radius: 12px; 
                padding: 0; 
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3); 
                border: 1px solid #374151;
            }
            .header { 
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
                padding: 30px 40px; 
                text-align: center; 
                position: relative;
            }
            .header:after {
                content: "";
                position: absolute;
                bottom: -20px;
                left: 0;
                right: 0;
                height: 20px;
                background: radial-gradient(circle at 50% 0%, rgba(245,158,11,0.2) 0%, transparent 70%);
            }
            .logo { 
                height: 40px; 
                margin-bottom: 15px; 
            }
            .content { 
                padding: 40px; 
                text-align: center; 
            }
            .greeting {
                font-size: 18px;
                margin-bottom: 25px;
                color: #fbbf24;
                text-align: left;
            }
            .otp-container {
                margin: 30px 0;
            }
            .otp-box { 
                background: rgba(245, 158, 11, 0.1); 
                padding: 20px; 
                border-radius: 8px; 
                margin: 0 auto; 
                display: inline-block; 
                font-size: 32px; 
                font-weight: 700; 
                color: #fbbf24; 
                letter-spacing: 5px; 
                border: 1px dashed #f59e0b;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            .footer { 
                text-align: center; 
                padding: 25px 40px; 
                background: #111827; 
                font-size: 13px; 
                color: #9ca3af;
                border-top: 1px solid #374151;
            }
            .security-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(16, 185, 129, 0.1);
                color: #10b981;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                margin-bottom: 25px;
            }
            .note { 
                color: #d1d5db; 
                font-size: 15px; 
                line-height: 1.6; 
                margin: 20px 0;
                text-align: left;
            }
            .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent);
                margin: 30px 0;
            }
            .btn {
                display: inline-block;
                background: #f59e0b;
                color: #1f2937 !important;
                padding: 12px 30px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                margin: 15px 0;
                transition: all 0.3s ease;
            }
            .btn:hover {
                background: #d97706;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(245,158,11,0.3);
            }
            .social-links {
                margin: 25px 0;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
            }
            @media screen and (max-width: 600px) {
                .container { margin: 10px; }
                .content, .header { padding: 25px; }
                .otp-box { font-size: 24px; padding: 15px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://framerusercontent.com/images/g0YTRh7uRHpbWQgSZz62bO050.png" class="logo" alt="EndGaming AI">
                <h1 style="color: white; margin: 10px 0 5px 0; font-weight: 700;">Welcome To EmoAI | Powerd by EndGaming Ai</h1>
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 15px;">Protecting your digital identity</p>
            </div>
    
            <div class="content">
                <div class="greeting">
                    Hello ${name || "Valued User"} 👋,
                </div>
                
                <div class="security-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Security Verification Required</span>
                </div>
                
                <p class="note">We received a request to verify your email address <strong>${email}</strong> for your EndGaming AI account. To complete this process, please use the following one-time verification code:</p>
    
                <div class="otp-container">
                    <div class="otp-box">${otp}</div>
                </div>
                
                <p class="note">This security code will expire in <strong>10 minutes</strong>. For your protection, please do not share this code with anyone.</p>
                
                <div class="divider"></div>
                
                <p class="note" style="text-align: center; font-size: 14px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" style="vertical-align: middle; margin-right: 5px;">
                        <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <em>If you didn't request this code, please secure your account by changing your password immediately.</em>
                </p>
            </div>
    
            <div class="footer">
                <div class="social-links">
                    <a href="https://www.instagram.com/201harshs/">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" alt="Instagram">
                    </a>
                    <a href="#">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter">
                    </a>
                    <a href="#">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" width="24" alt="Discord">
                    </a>
                </div>
                
                <p>© ${new Date().getFullYear()} EndGaming AI. All rights reserved.</p>
                <p style="margin: 8px 0; color: #6b7280;">736, endgamingai street , Tallitall,Naintal - 263002</p>
                <p style="margin-top: 15px;">
                    <a href="mailto:endgamingai2@gmail.com" style="color: #fbbf24; text-decoration: none;">Contact Support</a> 
                    | 
                    <a href="#" style="color: #fbbf24; text-decoration: none;">Privacy Policy</a> 
                    | 
                    <a href="#" style="color: #fbbf24; text-decoration: none;">Terms</a>
                </p>
                <p style="font-size: 11px; color: #6b7280; margin-top: 15px;">This is an automated message - please do not reply directly.</p>
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
