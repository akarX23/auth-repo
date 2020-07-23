//Required declarations
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const app = express();
const { auth } = require("./middleware/auth");

//Models
const User = require("./models/user");

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

//Requests
app.post("/api/user", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

app.post("/api/user/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) res.json({ message: "Auth failed" });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) return res.status(400).json({ message: "Wrong Password" });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).send("ok");
      });
    });
  });
});

app.get("/user/profile", auth, (req, res) => {
  res.status(200).send(req.token);
});

// Connect MongoDB at default port 27017.
mongoose.connect(
  "mongodb://localhost:27017/auth",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Started on port " + port);
});
