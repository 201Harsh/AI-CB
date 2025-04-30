const cron = require('node-cron');
const userModel = require("../models/user.model");
// Schedule a CRON job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    // Find users with 0 credits and refill their credits
    const usersToRefill = await userModel.find({ credits: 0 });

    if (usersToRefill.length > 0) {
      for (let user of usersToRefill) {
        // Refill the user's credits and update their last refill time
        user.credits = 5; // or any value you want
        user.lastCreditRefill = new Date();
        await user.save();
      }
    } 
  } catch (err) {
  }
});
