const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports.verifyUser = async (req, res, next) => {
  try {
    // Extract token from Authorization header or cookies
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // Decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Query the user based on the decoded user ID
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Attach user data to req.user for further processing in the route
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
