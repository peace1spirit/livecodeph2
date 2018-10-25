const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const encrypt = require('../helpers/encrypt')


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        unique: true,
        required : true,
        match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format']
    },
    password : {
        type: String,
        required : true,
        minlength: [6, 'password min 6 character']
    },
    likes:[{}]
    
}, {timestamps:true})

userSchema.plugin(uniqueValidator)
userSchema.pre('save', function(next) {
  this.password = encrypt.hashPassword(this.password, process.env.SECRET)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User