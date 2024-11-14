const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'lobenOnStairs',
}).then(() => console.log('Database connected'))

const FeedPostSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true},
    fromUsername: {type: String, required: true},
    timestamp: {type: Date, default: Date.now() },
    postImage: {type: Buffer, required: true},
    comments: {
        type: Array,
        items: {
            type: Object,
            properties: {
                id: {
                    type: 'integer'
                },
                commentWriter: {
                    type: String
                },
                comment: {
                    type: String
                }
            }
        }
    },
})

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: { type: Buffer },
    profile: {
        type: Object,
        properties: {
            lobe: Number,
            gelobt: Number
        }
    },
})


// Create Indexes
const FeedPost = mongoose.model('PostSchema', FeedPostSchema);
try {
    FeedPost.createIndexes().then(r => console.log("FeedPosts has been Indexed"));
} catch (err){console.log(err)}

const User = mongoose.model('UserSchema', UserSchema);
try {
    User.createIndexes().then(r => console.log("User has been Indexed"));
} catch (err){console.log(err)}

// Setup Backend-API
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// API-Logic
app.get("/", (req, resp) => {
    resp.send("LobenOnTheStairs");
});

app.post("/createUser", async (req, resp) => {
  try {
      const user = new User(req.body)
      let result = await user.save()
      result = result.toObject();
      if (result) {
          delete result.password
          resp.send(req.body);
          console.log(result);
      } else {console.log("Post already registerd");}

  } catch (err) {
      console.log("Error")
      resp.status(500).send('Something went wrong creation of User')}
})

// Get User for Login
app.get("/login", async (req, resp) => {
    try {
        const users = await User.find({name: req.body.name})
        if (users) {
            resp.send(users)
        } else { resp.send('No User existing')}
    } catch (err) {
        console.log(err)
        resp.status(500).send('Something went wrong')
    }})

// Get users for the Lob
app.get("/users", async (req, resp) => {
    try {
        const users = await User.find({},'name')
        if (users) {
            resp.send(users)
        } else { resp.send('No User existing')}
    }
    catch (err) {
        console.log(err)
        resp.status(500).send("Something went wrong getting Users")
    }
})

// Get Posts for the Feed
app.get("/posts", async (req, resp) => {
    try {
        const posts = await FeedPost.find({timestamp: new Date().getMonth()}).limit(10);
        resp.send(posts)
    }
    catch (err) {
        console.log(err)
        resp.status(500).send('Something went wrong getting Posts')
    }
});

// Upload a new Post
app.post("/createPost", async (req, resp) => {
    try {
        const post = new FeedPost(req.body)
        let result = await post.save()
        result = result.toObject();
        if (result) {
            resp.send(req.body);
            console.log(result);
        } else {console.log("Post already registerd");}
    } catch (e) {
        console.log(e)
        resp.status(500).send("Something Went Wrong creating Posts");
    }
});

console.log("App listen at port 5000");
// Run and listen to port 5000
app.listen(5000);