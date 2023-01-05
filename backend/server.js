import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model('User', userSchema)

// Routes start here

// The main endpoint
app.get("/", (req, res) => {
  res.send("Hello Welly user!");
});

// The endpoint to register
app.post("/register", async (req, res) => {
  const {username, password} = req.body
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 4) {
      res.status(400).json({
        success: false,
        response: "Your password must be longer than 4 characters."
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
      }).save();
      res.status(201).json({
        success: true,
        response: {username: newUser.username, accessToken: newUser.accessToken, id: newUser._id}
      })
    }
  } catch(error) {
    res.status(400).json({
      success: false,
      response: "Error"
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
