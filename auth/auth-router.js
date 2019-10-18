const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Auth = require('./auth-model.js')

router.get('/', (req, res) => {
  Auth.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ message: "Error retrieving users." }))
})

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  user.password = bcrypt.hashSync(user.password, 12)
  Auth.addUser(user)
    .then(id => res.status(200).json(id))
    .catch(error => res.status(500).json({ message: "Error adding to database." }))
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
