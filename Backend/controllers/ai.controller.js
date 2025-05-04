const ai = require("../config/responseai");
const UserModel = require("../models/user.model");
const nodemailer = require("../config/nodemailer");

module.exports.genResponse = async (req, res) => {
  try {
    const { email, name, prompt, chatHistorySave } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const user = await UserModel.findOne({ email }); // Find user by ID

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.credits <= 0) {
      return res.status(400).json({
        error: "Insufficient credits",
      });
    }

    // Step 2: Deduct the credit
    user.credits -= 1; // Deduct 1 credit

    // Step 3: Save the updated user record in the database
    await user.save();

    const ThankYouEmail = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Thank You for Choosing EndGaming AI!",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Our Gratitude | EndGaming AI</title>
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
                padding: 40px; 
                text-align: center; 
                position: relative;
            }
            .shine-effect {
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(
                    to bottom right,
                    rgba(255,255,255,0) 45%,
                    rgba(255,255,255,0.8) 50%,
                    rgba(255,255,255,0) 55%
                );
                opacity: 0;
                transform: rotate(30deg);
                animation: shine 5s infinite;
            }
            @keyframes shine {
                0% { opacity: 0; left: -50%; }
                20% { opacity: 0.5; }
                100% { opacity: 0; left: 150%; }
            }
            .logo { 
                height: 40px; 
                margin-bottom: 15px; 
                position: relative;
                z-index: 2;
            }
            .content { 
                padding: 40px; 
                text-align: center; 
            }
            .greeting {
                font-size: 20px;
                margin-bottom: 25px;
                color: #fbbf24;
                text-align: center;
                font-weight: 600;
            }
            .appreciation-icon {
                width: 80px;
                height: 80px;
                background: rgba(245, 158, 11, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 25px;
                border: 2px solid #f59e0b;
                position: relative;
                overflow: hidden;
            }
            .pulse {
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(245, 158, 11, 0.2);
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(0.8); opacity: 0.7; }
                70% { transform: scale(1.3); opacity: 0; }
                100% { opacity: 0; }
            }
            .note { 
                color: #d1d5db; 
                font-size: 15px; 
                line-height: 1.6; 
                margin: 20px 0;
                text-align: left;
            }
            .highlight-box {
                background: rgba(245, 158, 11, 0.05);
                border-left: 3px solid #f59e0b;
                padding: 15px;
                margin: 25px 0;
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
                padding: 14px 32px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                margin: 25px 0;
                transition: all 0.3s ease;
                font-size: 15px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .btn:hover {
                background: #d97706;
                transform: translateY(-2px);
                box-shadow: 0 7px 20px rgba(245,158,11,0.3);
            }
            .testimonial {
                font-style: italic;
                color: #9ca3af;
                position: relative;
                padding: 0 20px;
            }
            .testimonial:before,
            .testimonial:after {
                content: '"';
                font-size: 32px;
                color: #f59e0b;
                position: absolute;
                opacity: 0.3;
            }
            .testimonial:before {
                top: -15px;
                left: 0;
            }
            .testimonial:after {
                bottom: -25px;
                right: 0;
            }
            .footer { 
                text-align: center; 
                padding: 25px 40px; 
                background: #111827; 
                font-size: 13px; 
                color: #9ca3af;
                border-top: 1px solid #374151;
            }
            @media screen and (max-width: 600px) {
                .container { margin: 10px; }
                .content, .header { padding: 25px; }
            }
            .appreciation-icon {
            width: 80px;
            height: 80px;
            background: rgba(245, 158, 11, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 25px;
            border: 2px solid #f59e0b;
            position: relative;
            overflow: hidden;
        }
        .user-avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="shine-effect"></div>
                <img src="https://framerusercontent.com/images/g0YTRh7uRHpbWQgSZz62bO050.png" class="logo" alt="EndGaming AI">
                <h1 style="color: white; margin: 10px 0 5px 0; font-weight: 700;">We Appreciate You</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 15px;">Thank you for being part of our journey</p>
            </div>
    
            <div class="content">
                <div class="appreciation-icon">
                <div class="pulse"></div>
                <img src="https://randomuser.me/api/portraits/men/11.jpg" class="user-avatar" alt="${
                  name || "User"
                }'s profile" 
                     onerror="this.onerror=null; this.parentNode.innerHTML='<svg width=\\'36\\' height=\\'36\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'#f59e0b\\' stroke-width=\\'2\\'><path d=\\'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3\\'></path></svg>'">
            </div>
                
                <div class="greeting">
                    ${name || "Valued User"}, Your Trust Means Everything
                </div>
                
                <p class="note">We wanted to take a moment to sincerely thank you for choosing <strong style="color: #f59e0b;">EmoAI</strong>. Your decision to use our platform motivates us every day to build better tools and create more value for you.</p>
    
                <div class="highlight-box">
                    <p style="margin: 0; color: #fbbf24; font-weight: 500;">Did you know?</p>
                    <p style="margin: 8px 0 0 0; color: #d1d5db; font-size: 14px;">You're now part of a community of ${
                      Math.floor(Math.random() * 50000) + 50000
                    } developers and gamers who are shaping the future of AI in gaming.</p>
                </div>
    
                <p class="testimonial">"EndGaming AI transformed our workflow. What used to take days now takes hours, with even better results."</p>
                <p style="color: #9ca3af; font-size: 13px; margin-top: 30px;">— <strong style="color: #f59e0b;">Harsh</strong>., EndGaming Founder</p>
    
                <div class="divider"></div>
                
                <p class="note" style="text-align: center;">
                    We'd love to hear about your experience. Share your feedback for a chance to be featured in our community spotlight!
                </p>
    
                <a href="https://www.instagram.com/201harshs/" class="btn">Share Your Story</a>
            </div>
    
            <div class="footer">
                <p style="margin-bottom: 15px;">
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
                    <a href="https://www.instagram.com/201harshs/" style="color: #fbbf24; text-decoration: none; margin: 0 10px;">About Us</a>
                    <a href="https://www.instagram.com/201harshs/" style="color: #fbbf24; text-decoration: none; margin: 0 10px;">Success Stories</a>
                    <a href="https://www.instagram.com/201harshs/" style="color: #fbbf24; text-decoration: none; margin: 0 10px;">Upcoming Features</a>
                </p>
                <p>© ${new Date().getFullYear()} EndGaming AI. All rights reserved.</p>
                <p style="margin: 8px 0; color: #6b7280;">Made with <span style="color: #f59e0b;">♥</span> by Harsh</p>
            </div>
        </div>
    </body>
    </html>`,
    };

    if (!user.emailSent) {
      const info = await nodemailer.sendMail(ThankYouEmail);
      user.emailSent = true;
    }

    await user.save();

    const response = await ai(prompt, name, chatHistorySave);
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
