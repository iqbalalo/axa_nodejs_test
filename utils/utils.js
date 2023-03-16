const constants = require("../lib/constants");
const nodemailer = require("nodemailer");

// Generate url quary params
exports.generateMsgParam = function (msg, msgType = constants.MSG_SUCCESS) {
  const m = {
    msg: msg,
    msg_type: msgType,
  };
  const objString = "?" + new URLSearchParams(m).toString();
  return objString;
};


// Send mail
exports.sendEMail = function (emailUser) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "derek.krajcik32@ethereal.email",
      pass: "N3syJWFcWFxxtBJEC3",
    },
  });

  var mailOptions = {
    from: "do_not_reply@northpole.coml",
    to: "santa@northpole.com",
    subject: "Cristmas Gift Confirmation",
    html: "<p> Hi " + emailUser.username + ",<br/>" + emailUser.address + "<br/>" + emailUser.message + "</p>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
