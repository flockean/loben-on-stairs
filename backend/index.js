const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/', {
    dbName: 'lobenOnStairs',
}).then(() => console.log('Database connected'))

const FeedPostSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    username: {type: String, required: true},
    byUser: {type: String, required: true},
    timestamp: {type: Date, default: Date.now()},
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
    profile: {
        type: Object,
        properties: {
            lobe: Number,
            gelobt: Number
        }
    },
})

const FeedPost = mongoose.model('PostSchema', FeedPostSchema);
try {
    const FeedPost = mongoose.model('PostSchema', FeedPostSchema);
    FeedPost.createIndexes().then(() => console.log("FeedPosts has been Indexed"));
} catch (err){console.log(err)}

const User = mongoose.model('UserSchema', UserSchema);
try {
    const User = mongoose.model('UserSchema', UserSchema);
    User.createIndexes().then(() => console.log("User has been Indexed"));

} catch (err){console.log(err)}

// Setup Backend-API
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
try {
    User.findOne({name: 'Anon'}).exec().then(
        data => {
            if (data === null) {
                let user = new User({name: "Anon", password: "Anon", profile: {gelobt: 0, lobe: 0}});
                user.save()
                console.log("Anon has been added")
            }
        }
    )
} catch (err) {

}

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
      } else {console.log("User already registerd");}

  } catch (err) {
      console.log("Error")
      resp.status(500).send('Something went wrong creation of User')}
})

// Get User for Login
app.post("/login", async (req, resp) => {
    try {
        const user = await User.findOne({name: req.body.name})
        if (req.body.password === user.password) {
            resp.send(user)
        } else { resp.status(401).send('Unauthorized')}
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
        console.log(req.body)
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