const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Auth = require('./auth-model.js')

const secret = "secretsecretsecret";

router.get('/', (req, res) => {
  res.send({ api: "running" })
})

router.post('/register', validateUser, (req, res) => {
  // implement registration
  const user = req.body
  user.password = bcrypt.hashSync(user.password, 12)
  Auth.addUser(user)
    .then(id => res.status(200).json(id))
    .catch(error => res.status(500).json({ message: "Error adding to database." }))
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body
  Auth.findUser(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(201).json({ token })
      } else {
        res.status(400).json({ message: "Failed to login." })
      }
    })
    .catch(error => res.status(500).json({error: "HELP!"}))
});

function validateUser(req, res, next) {
  const user = req.body
  if (user) {
    console.log(user)
    if (!user.username || !user.password) {
      res.status(400).json({ message: "Missing required info"})
    } else {
      next()
    }
  } else {
    res.status(400).json({ message: "Please provide a body in the request." })
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    user: user.username
  };

  const options = {
    expriesIn: '1h'
  };

  jwt.sign(payload, secret, options)
}

module.exports = router;
