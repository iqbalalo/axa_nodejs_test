const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const constants = require("./lib/constants");
const usersRouter = require("./routes/users");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/users", usersRouter);

// index route
app.get("/", (req, res) => {
  res.render("index");
});

// Common route to show message
app.get("/show_message", (req, res) => {
  res.render("message", {
    msg: constants.MSG_TEXT[req.query.msg],
    msg_type: req.query.msg_type,
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
