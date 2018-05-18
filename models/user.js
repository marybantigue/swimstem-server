const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//hook for the userSCheme
userSchema.pre('save', async function(next){
  try {
    // 'this' is our document

    if(!this.isModified('password')){
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next(); // goes to 'save'
  } catch(err){
    return next(err);
  };
});

// a method for our document
userSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (e) {
    return next(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
