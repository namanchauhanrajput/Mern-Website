const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const adminRoute = require("./router/admin-router.js");
const contactRouter = require("./router/contact-router");
const connectDB = require("./config/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
require("dotenv").config();


const corsOptions = {
  origin: "http://localhost:3000",
  method: "GET, POST, DELETE, PUT, PATCH, HEAD",
  Credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRouter);


app.get("/", (req, res) => {
  res.send("Server is working ✅");
});
// admin route--
app.use("/api/admin", adminRoute);



connectDB();

app.use(errorMiddleware);


// app.get("/kishan", (req, res) => {
//   res.status(200).send("Welcome Naman Chauhan rajput111444");
// });


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
