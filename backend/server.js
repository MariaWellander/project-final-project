import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on.
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

// --- Routes start here ---
// The main endpoint
app.get("/", (req, res) => {
  res.send("Hello Welly user!");
});

// Endpoint to register
app.post("/register", async (req, res) => {
  const {username, password} = req.body
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Your password must be longer than 8 characters."
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

// Endpoint to log in
app.post("/login", async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await User.findOne({username});
    if(user && bcrypt.compareSync(password, user.password)){
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      })
    } else {
      res.status(400).json({
        success: false,
        response: "Username or password is incorrect"})
    }
  } catch (error){
    res.status(500).json({ success: false,
      response: error})
  }
})

// Endpoint to authenticate the user
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try{
    const user = await User.findOne({accessToken: accessToken});
    if(user){
      next()
    }else{
      res.status(401).json({
        success: false,
        response: "Please log in"
      })
    }
  } catch(error) {
    res.status(400).json({ success: false,
      response: error
    })
  }
}

// Endpoint to access the activity feed. Only reached by authenticated users.
const ActivitySchema = new mongoose.Schema({
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  hearts: {
    type: Number,
    default: 0
  }
});

const Activity = mongoose.model("Activity", ActivitySchema);

app.get("/activities", authenticateUser);
app.get("/activities", async (req, res) => {
  const activities = await Activity.find({});
  res.status(200).json({success: true, response: activities});
});

app.post("/activities", authenticateUser);
app.post("/activities", async (req, res) => {
  const { message } = req.body;
  try {
    const newActivity = await new Activity({message}).save();
    res.status(201).json({success: true, response: newActivity});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
