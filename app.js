const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/users");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

// Sessions
//what keeps us logged in throughout different pages
//something to help you stay logged in as much as you want
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
//adding passport to the application ie essentially saying that  we gonna use passport.
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });
// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });
// app.get("/register", (req, res) => {
//   res.render("signup.ejs");
// });
