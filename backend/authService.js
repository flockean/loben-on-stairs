import jwt from 'jsonwebtoken'
import configService from './configService.js';

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, configService.environmentVariable.JWT_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
}

function createToken(userId, username, userType) {
    // 15 min until token expires
    const d = new Date();
    var expires = new Date(d.getTime() + 15*60000).getTime();
    var toEncode = {"sub": username, "user_id": userId, "user_type": userType, "exp": expires, "token_type": "bearer"};
    return jwt.sign(toEncode, configService.environmentVariable.JWT_KEY)
}

/* // Example route that requires authentication
app.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
});
*/

export default { createToken, verifyToken };