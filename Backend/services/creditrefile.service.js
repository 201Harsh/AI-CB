// services/creditRefillService.js
const cron = require("node-cron");
const UserModel = require("../models/user.model");

const MAX_CREDITS = 5;

const startCreditRefillJob = () => {
  cron.schedule("0 */12 * * *", async () => {
    try {
      const users = await UserModel.find();
      for (let user of users) {
        if (user.credits < MAX_CREDITS) {
          user.credits = MAX_CREDITS;
        }
        user.emailSent = false;
        await user.save();
      }
    } catch (err) {
    }
  });
};

module.exports = startCreditRefillJob;
