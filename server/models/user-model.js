const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true }, // Plain password for testing
  isAdmin: { type: Boolean, default: false }, 
});

// ❌ Comment out the hashing middleware (FOR TESTING ONLY)
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(user.password, salt);
//     user.password = hash_password;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// ❌ Comment out bcrypt-based comparison
// ✅ Add plain password comparison
userSchema.methods.comparePassword = async function (password) {
  return password === this.password;
};

// ✅ JWT token generation
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token error:", error);
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
