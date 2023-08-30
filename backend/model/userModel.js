const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "This field is required"],
    minlength: [4, "Username must have at least 4 characters"],
  },
  email: {
    type: String,
    required: [true, "This field is required"],
  },
  password: {
    type: String,
    required: [true, "This field is required"],
    minlength: [8, "password must have at least 8 characters"],
  },
});

userSchema.methods.matchPassword = async function(enteredpassword){
  return await bcrypt.compare(enteredpassword,this.password)
}

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
      next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})


module.exports= mongoose.model('User',userSchema)
