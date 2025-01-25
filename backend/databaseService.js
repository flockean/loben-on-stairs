import mongoose from "mongoose";
import configService from "./configService.js"

const connectDB = async () => {
    try {
        mongoose.connect(configService.environmentVariable.MONGO_URL).then(() => {
            console.log("Database connected")
        })
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed...');
    } catch (err) {
        console.error(err.message);
    }
};

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

const FeedPost = mongoose.model('FeedPost', FeedPostSchema);
const User = mongoose.model('User', UserSchema);

const initDB = async () => {
    connectDB().then(() =>{
        FeedPost,
        User,
        initializeAnonUser();

    }).catch(err => {
        console.log("Error during init of Database" + err)
        process.exit(1);
    });
}


export default {initDB, closeDB, FeedPost, User};