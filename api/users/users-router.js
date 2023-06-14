const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      console.log('fetching users...')
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "The users information could not be retrieved" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params
  res.status(200).json(req.user)
  console.log('fetching user with id: ', id)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const body = req.body
  Users.insert(body)
    .then(user => {
      console.log('adding user...')
      res.status(201).json(user)
    })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  const body = req.body
  Users.update(id, body)
    .then(user => {
      console.log('updating user...')
      res.status(200).json(user)
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params
  const userToDelete = req.user
  Users.remove(id)
    .then(user => {
      console.log('deleting user...')
      res.status(200).json(userToDelete)
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params
  Users.getUserPosts(id)
    .then(posts => {
      console.log('fetching user posts...')
      res.status(200).json(posts)
    })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  const body = req.body
  Posts.insert({ ...body, user_id: id })
    .then(post => {
      console.log('adding post...')
      res.status(201).json(post)
    })
});

// do not forget to export the router

module.exports = router;
