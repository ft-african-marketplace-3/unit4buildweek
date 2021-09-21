const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const db = require('./data/db-config')
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const restrict = require("./middleware/restricted");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", restrict, authRouter);

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
