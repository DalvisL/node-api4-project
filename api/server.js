const express = require('express');
const userRouter = require('./users/users-router.js');
const server = express();
const cors = require('cors');

const { logger, auth } = require('./middleware/middleware.js');

// remember express by default cannot parse JSON in request bodies
server.use(cors());
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', userRouter);



server.post('/api/login', auth, (req, res) => {
  res.status(200).json({ message: "welcome, " + req.body.username })
});

server.post('/api/register', auth, (req, res) => {
  const { username, password } = req.body

  if(!username || !password) {
    res.status(400).json({ message: "missing username or password" })
  } else {
    res.status(201).json({ message: "user created" })
  }
});

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
