const cron = require("node-cron");
const express = require("express");
const router = express.Router();
const users = require("../models/users");
const utils = require("../utils/utils");
const constants = require("../lib/constants");
var usersToEmail = [];

// Cron job every 15 minutes
cron.schedule("*/15 * * * *", function () {
  try {
    usersToEmail.forEach((u) => {
      if (u) {
        utils.sendEMail(u);
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    usersToEmail = [];
  }
});

router.post("/", async (req, res) => {
  const name = req.body.username;
  const wish = req.body.wish;

  // check user
  result = await users.checkUser(username = name, userMessage=wish);

  if (result.user) {
    // create list to send email
    usersToEmail.push(result.user);
  }

  res.redirect(
    "/show_message" +
      utils.generateMsgParam(
        result.msg,
        result.user ? constants.MSG_SUCCESS : constants.MSG_ERROR
      )
  );
});
module.exports = router;
