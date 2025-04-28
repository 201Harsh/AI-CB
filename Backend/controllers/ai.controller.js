const ai = require("../config/responseai");
const UserModel = require("../models/user.model");

module.exports.genResponse = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const {email} = req.body.email;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const user = await UserModel.findOne(email); // Find user by ID

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

    const response = await ai(prompt);
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};