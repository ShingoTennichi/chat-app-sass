const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("User", User);

module.exports = userModel;
