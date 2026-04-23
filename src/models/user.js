const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
   type: String,
   required: true,
   unique: true,
   match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
   type: String,
   required: true
 },
  role: {
    type: String,
    default: 'customer'
  }
});

module.exports = mongoose.model('User', userSchema);