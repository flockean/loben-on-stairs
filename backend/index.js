const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'lobenOnStairs',
}).then(() => console.log('Database connected'))

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Create Indexes
const User = mongoose.model('users', UserSchema);
try {
    User.createIndexes().then(r => console.log("Users has been Indexed"));
}
catch (err){console.log(err)}

// Setup Backend-API
const express = require('express');
const app = express();
const cors = require("cors");


console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

// API-Logic

app.get("/", (req, resp) => {
    resp.send("LobenOnTheStairs");
});

app.post("/user", async (req, resp) => {
  try {

  } catch (err) {
      console.log("Error")
      resp.status(500).send('Something went wrong')

  }
})

// Get User for Login
app.get("/user", async (req, resp) => {
    try {

    } catch (err) {
        console.log(err)
        resp.status(500).send('Something went wrong')
    }
})

// Get users for the Lob
app.get("/users", async (req, resp) => {
    try {

        // resp.send();
    }
    catch (err) {
        console.log(err)
        resp.status(500).send("Something went wrong")
    }
})

// Get Posts for the Feed
app.get("/posts", async (req, resp) => {
    try {

        resp.send("objects of posts")
    }
    catch (err) {
        console.log(err)
        resp.status(500).send('Something went wrong')
    }
});

// Upload a new Post
app.post("/post", async (req, resp) => {
    try {
        // This is how something new get registered

        // const user = new User(req.body);
        // let result = await user.save();
        // result = result.toObject();
        // if (result) {
        //     delete result.password;
        //     resp.send(req.body);
        //     console.log(result);
        // } else {console.log("User already register");}
    } catch (e) {
        resp.status(500).send("Something Went Wrong");
    }
});

// Run and listen to port 5000
app.listen(5000);