const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const crypto = require('node:crypto');

require('dotenv').config();


const mongourl = {
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
}

const app = express();

app.use("/login", express.json());
app.use("/register", express.json());
app.use("/createPost", express.json());
app.use("/updateUser", express.json());
app.use("/posts", express.json());
app.use("/users", express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(mongourl.MONGO_URL);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

connectDB();

const FeedPostSchema = new mongoose.Schema({
    id: { type: String, required: true, default: crypto.randomUUID() },
    timestamp: { type: Date, default: new Date().toISOString() },
    username: { type: String, required: true },
    caption: { type: String, default: '' },
    byUser: { type: String, required: true },
    image: { type: String, required: true },
    comments: [
        {
            id: { type: Number },
            commentTimestamp: { type: String, default: new Date().toISOString() },
            commentWriter: { type: String },
            comment: { type: String },
        },
    ],
});


const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, default: crypto.randomUUID() },
    creation: { type: Date, default: new Date().toISOString()},
    name: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    avatar: { type: String, default: 'assets/images/defaultProfile.png'},
    profile: { 
        lobe: {type: Number, default: 0}, 
        gelobt: {type: Number, default: 0}
    }
});

const FeedPost = mongoose.model('FeedPost', FeedPostSchema);
const User = mongoose.model('User', UserSchema);

const initializeAnonUser = async () => {
    try {
        const user = await User.findOne({ name: 'Anon' });
        if (!user) {
            const anonUser = new User({ name: 'Anon', password: 'Anon', profile: { gelobt: 0, lobe: 0 } });
            await anonUser.save();
            console.log('Anon user has been added');
        }
    } catch (error) {
        console.error('Error initializing Anon user:', error);
    }
};

initializeAnonUser();

app.get('/', (req, res) => {
    res.send('LobenOnTheStairs');
});

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        const userObj = result.toObject();
        userObj.password = undefined;
        console.log('User created:', userObj);
        res.send(userObj);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Something went wrong during user creation');
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (user && req.body.password === user.password) {
            user.password = undefined;
            console.log('User logged in:', user);
            res.send(user);
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Something went wrong during login');
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, ['name', 'id', 'avatar', 'profile']);
        console.log('User requested', users);
        res.send(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Something went wrong getting users');
    }
});

app.put('/updateUser', async (req, res) => {
    try {
        await User.findOneAndUpdate({ name: req.body.name }, req.body);
        const updatedUser = await User.findOne({ name: req.body.name });
        updatedUser.password = undefined;
        console.log('User updated:', updatedUser);
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Something went wrong updating user');
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await FeedPost.find({ timestamp: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } }).limit(10);
        res.send(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).send('Something went wrong getting posts');
    }
});

app.post('/createPost', async (req, res) => {
    try {
        const post = new FeedPost(req.body);
        const result = await post.save();
        console.log('Post created:', result);
        res.send(result);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Something went wrong creating post');
    }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Endpoint for uploading images
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('Image upload request received');
    try {
        console.log('Image uploaded:', req.file);
        res.status(200).send({ message: 'Image uploaded successfully', file: req.file });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Something went wrong during image upload');
    }
});

// Endpoint for getting image URL
app.get('/image/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing image:', err);
            return res.status(404).send('Image not found');
        }
        res.sendFile(filePath);
    });
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});