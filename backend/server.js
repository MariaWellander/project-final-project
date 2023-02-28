import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import originalData from "./data/original-activities.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on

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
  res.send("Hello Welly user! This is the backend built for: https://welly-app.netlify.app/");
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
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      });
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

// To authenticate the user

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
    res.status(400).json({
      success: false,
      response: error
    })
  }
}

// Activity schema and model for activity content

const ActivitySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength:1,
    maxlength:150,
    trim: true
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

// Endpoint to access the activity feed. Only reached by authenticated users.

app.get("/activities", authenticateUser);
app.get("/activities", async (req, res) => {
  try {
  const activities = await Activity.find().sort({createdAt: -1}).limit(25).exec();
    if (activities) {
      res.status(200).json({
        success: true,
        response: activities
      });
    }
  } catch (error) {
    res.status(400).json({
      body: {
        success: false,
        response: error,
      }
    });
  }
});

// Endpoint to post a new activity in the activity feed. Only authenticated users can do this.

app.post("/activities", authenticateUser);
app.post("/activities", async (req, res) => {
  const { message } = req.body;
  try {
    const newActivity = await new Activity({message}).save();
    res.status(201).json({
      success: true,
      response: newActivity});
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error});
  }
});

// Endpoint to modify the number of heart-likes an activity gets. Updates the activity with +1 hearts when heart-liking the specific activity.

app.patch("/activities/:id/hearts", authenticateUser);
app.patch("/activities/:id/hearts", async (req, res) => {
  const { id } = req.params;
  try {
    const heartsToUpdate = await Activity.findByIdAndUpdate(id, {$inc: {hearts: 1}});
    res.status(200).json({
      success: true,
      response: `Activity ${heartsToUpdate.name} has their likes updated`})
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error})
  }
});

// Endpoint to change the message of an already existing activity in the activity feed. Only authenticated users can do this.

app.put("/activities/:id", authenticateUser);
app.put("/activities/:id", async (req, res) => {
  const { message } = req.body;
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        response: "Activity not found"
      });
    }
      activity.message = message;
      const updatedActivity = await activity.save();
      res.status(200).json({
        success: true,
        response: updatedActivity
      });
  } catch (error) {
      res.status(400).json({
        success: false,
        response: error
      });
  }
});

// Endpoint to delete an already existing activity in the activity feed. Only authenticated users can do this.

app.delete("/activities/:id", authenticateUser);
app.delete("/activities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        response: "Activity not found"
      });
    }
    res.status(200).json({
      success: true,
      response: "Activity deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    });
  }
});

// Model for original content: the activities that exists from start

const Original = mongoose.model("Original", {
  id: Number,
  message: String,
  createdAt: String,
  hearts: Number,
  category: String
});

// Resetting DataBase on demand

if (process.env.RESET_DB) {
  console.log("Resetting database!");

  const resetDataBase = async () => {
    await Original.deleteMany({});
    originalData.forEach((singleOriginal) => {
      const newOriginal = new Original(singleOriginal);
      newOriginal.save();
    });
  };
  resetDataBase();
}

// --- Routes start here ---

// Endpoint to access the original activity content. Only reached by authenticated users.

app.get("/originals", authenticateUser);
app.get("/originals", async (req, res) => {
  try {
    const originals = await Original.find({});
    if (originals) {
      res.status(200).json({
        success: true,
        response: originals
      });
    }
  } catch (error) {
    res.status(400).json({
      body: {
        success: false,
        response: error,
      }
    });
  }
});

// Endpoint to access the original activity content, sorted on the "Physical" category and the first letter in the message. Only reached by authenticated users.

app.get("/originals/physical", authenticateUser);
app.get("/originals/physical", async (req, res) => {
  try {
    const originals = await Original.find({category: "Physical"}).sort({message: "asc"}).exec();
    if (originals) {
      res.status(200).json({
        success: true,
        response: originals
      });
    }
  } catch (error) {
    res.status(400).json({
      body: {
        success: false,
        response: error,
      }
    });
  }
});

// To start the server

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
