const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const signupSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  hostel_name: {
    type: String,
    required: [true, "Hostel Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirm_password: {
    type: String,
    required: [true, "Confirm Password is required"],
  },
});
signupSchema.statics.findAndValidate = async function (email, password) {
  const foundUser = await this.findOne({ email });
  const isValid = await bcrypt.compare(password, foundUser.password);

  return isValid ? foundUser : false;
};

signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Signup = mongoose.model("signup", signupSchema);
module.exports = Signup;
