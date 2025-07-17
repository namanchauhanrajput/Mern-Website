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
  origin: [
    "http://localhost:3000",
    "https://mern-frontend-lysp.onrender.com",
    "https://mern-website-25i1.vercel.app"
  ],
  methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRouter);
app.use("/api/admin", adminRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// DB and Middlewares
connectDB();
app.use(errorMiddleware);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
