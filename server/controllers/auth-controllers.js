const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


// const home = async (req, res) => {
//     try {
//         res.status(200).json({ message: "Welcome Naman Chauhan ye home hai" });
//     } catch (error) {
//         console.log(error);
 
//     }
// };

//resister or signup part========================================

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, gender, dob, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {

            return res.status(400).json({ message: "Email already exists" });

        }

        const newUser = await User.create({ username, email, phone, gender, dob, password });

        res.status(201).json({
            message: "successful",
            token: await newUser.generateToken(),
            userId: newUser._id.toString()
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


//login part========================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Plain-text password match (NO bcrypt)
    if (password === userExist.password) {
      const token = userExist.generateToken();

      return res.status(200).json({
        message: "Login successful",
        token: token,
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



// to send user data - user logic=============


const user = async (req,res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({userData});
    
  } catch (error) {
     res.status(500).json({ message: "Server error from user route" });
    
  }
}

module.exports = { register, login, user};

// home,




// ye hai bcrpyt hash save password ke liye/=================================

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const userExist = await User.findOne({ email });
//         console.log(userExist);


//         if (!userExist) {
//             return res.status(400).json({ message: "Invalid Credentials" });
//         }

//         // const user = await bcrypt.compare(password, userExist.password);
//         // const user = await userExist.comparePassword(password);

//         if (user) {
//             res.status(200).json({
//                 message: "Login succesful",
//                 token: await userExist.generateToken(),
//                 userId: userExist._id.toString()
//             });
//         } else {
//             res.status(401).json({ message: "Invalid Email or Password" });
//         }


//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });

//     }
// }
