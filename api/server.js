const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/users-router.js");
const authRouther = require("../auth/router");
const restricted = require("../auth/restricted-middleware.js");

const server = express();


cconst sessionConfig = {
  name: "monster",
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // true in production to send only over https
    httpOnly: true, // true means no access from JS
  },
  resave: false,
  saveUninitialized: true, // GDPR laws require to check with client
};


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter)


server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
