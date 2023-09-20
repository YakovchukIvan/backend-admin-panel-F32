const {Schema, model} = require('mongoose')

const User = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  isActivated: {type: Boolean, default: false},
  password: {type: String, require: true},
  sex: {type: String, required: true},
  phone: {type: String, required: true},
  roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)
