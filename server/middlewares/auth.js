// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//     let token = req.headers.authorization

//     if (!token && req.headers["x-access-token"]) {
//         token = req.headers["x-access-token"]
//     }

//     if (token.startsWith('Bearer ')) {
//         token = token.split(" ")[1];
//     }
//     if (!token) {
//         return res.status(401).json({ message: "Not authenticated." })
//     }

//     jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//         if (err) return res.status(403).json({ message: "Token is not valid!" })
//         req.user = payload
//         next()
//     })
// }

// module.exports = auth;


// middleware/auth.js
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    // console.log(token)

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info from the token to req
        next();
    } catch (error) {
        console.log(error)
        // Check if the error is due to an expired token
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }

        // Handle other JWT errors (e.g., invalid token)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = verifyToken;

