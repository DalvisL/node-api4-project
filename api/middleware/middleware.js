const Users = require('../users/users-model')
const registeredUsers = require('../auth')

function logger(req, res, next) {
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const body = req.body
  if (!body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const body = req.body
  if (!body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
}

function auth(req, res, next) {
  // DO YOUR MAGIC
  const { username, password } = req.body
  if (!username || !password) {
    res.status(401).json({ message: "missing username or password" })
  } else if (!registeredUsers["0"].username || registeredUsers["0"].password !== password) {
    res.status(401).json({ message: "invalid credentials" })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  auth
}
