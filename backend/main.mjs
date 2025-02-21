import express, { json } from 'express';
import cors from 'cors';
import { access, constants } from 'fs';
import multer from 'multer';
import { join } from 'path';
import dbService  from './databaseService.js'; 
import authService from './authService.js';
import configService from './configService.js';

await dbService.initDB()
const app = express();

app.use("/login", json());
app.use("/register", json());
app.use("/post", json());
app.use("/user", json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('LobenOnTheStairs');
});

app.post('/register', async (req, res) => {
    try {
        const user = new dbService.User(req.body);
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
        const user = await dbService.User.findOne({ name: req.body.name });
        if (user && req.body.password === user.password) {
            user.password = undefined;
            var token = authService.createToken({userId: user.id, username: user.name, userType: "user"})
            console.log('User logged in:', user);
            res.status(202).send({token});
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Something went wrong during login');
    }
});

app.get('/user', authService.verifyToken, async (req, res) => {
    try {
        const users = await dbService.User.find({}, ['name', 'id', 'avatar', 'profile']);
        console.log('Users requested', users);
        res.send(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Something went wrong getting users');
    }
});

app.get('/user/:userid', authService.verifyToken ,async (req, res) => {
    try {
        const user = await dbService.User.findOne({id: req.params.userid})
        user.password = undefined
        console.log('User Requested:', user)
        res.status(202).send(user)
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Something went wrong getting users');
    }
})

app.put('/user/:userid', authService.verifyToken, async (req, res) => {
    try {
        await dbService.User.findOneAndUpdate({ name: req.params.userid }, req.body);
        const updatedUser = await dbService.User.findOne({ name: req.body.name });
        updatedUser.password = undefined;
        console.log('User updated:', updatedUser);
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Something went wrong updating user');
    }
});

app.get('/post', authService.verifyToken, async (req, res) => {
    try {
        const posts = await dbService.FeedPost.find({ timestamp: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } }).limit(10);
        res.send(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).send('Something went wrong getting posts');
    }
});

app.put('/post/:postid', authService.verifyToken, async (req, res) => {
    try {
        await dbService.FeedPost.findOneAndUpdate({ id: req.params.postid }, req.body);
        const updatedPost = await dbService.FeedPost.findOne({ id: req.params.postid });
        console.log('Post updated:', updatedPost);
        res.status(200).send(updatedPost);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Something went wrong updating user');
    }
});

app.post('/post', authService.verifyToken, async (req, res) => {
    try {
        const post = new dbService.FeedPost(req.body);
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
        cb(null, import.meta.dirname + '/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Endpoint for uploading images
app.post('/upload', authService.verifyToken, upload.single('file'), (req, res) => {
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
app.get('/image/:filename',  (req, res) => {
    const filePath = join(import.meta.dirname, 'uploads', req.params.filename);
    access(filePath, constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing image:', err);
            return res.status(404).send('Image not found');
        }
        res.sendFile(filePath);
    });
});

app.listen(configService.environmentVariable.EXPOSE_PORT, () => {
    console.log(`App listening at port ${configService.environmentVariable.EXPOSE_PORT}`);
});

export default {}