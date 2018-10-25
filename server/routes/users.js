var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const {auth} = require('../middleware/auth')
const User = require('../models/User')
const makehash = require('../helpers/encrypt')

/* GET users listing. */


router.post('/register', (req, res) => {

  console.log('register')
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  User.create(newUser)
    .then(() => {
      res.status(201).json({message: 'User created!'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err.message})
    })
})

router.post('/login', (req, res) => {
  let hashed = makehash.hashPassword(req.body.password, process.env.SECRET)

  User.findOne({$or: [{email: req.body.email}, {email: req.body.email}], password: hashed})
    .then(user => {
      if(user){
        let obj = {
          id: user._id,
          name: user.name,
          email: user.email
        }
        jwt.sign(obj, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            res.status(500).json(err)
          } else {
            res.status(201).json( {token:token, user: obj})
          }
        })
      }
      else{
        console.log('invalid password')
        res.status(400).json({ message: 'invalid password' })
      }
          
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})
router.post('/likes', auth, (req, res) => {
  console.log('update like')
  let updatelikes = User.updateOne({_id: req.decoded.id}, {$push: {likes: req.body.id}})
  Promise.all([updatelikes])
    .then(() => {
      res.status(201).json({msg: `You just like this video`})
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})

router.get('/', auth, (req, res) => {
  const Payload= {
    id: req.decoded.id,
    name: req.decoded.name,
    email: req.decoded.email
  }
  res.status(200).json({
      message: 'Login success',
      user: Payload
  })
})
router.get('/getuser', auth, (req, res) => {
  User.findOne({_id: req.decoded.id })
    .then(user => {
        let obj = {
          id: user._id,
          name: user.name,
          email: user.email,
          likes: user.likes
        }
        res.status(201).json( {user: obj})
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})


module.exports = router;
