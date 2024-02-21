const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticateUser = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, '123456789');

        const user = await User.findOne({ _id: decoded.userId });

        console.log(decoded, user, req.token, req.userId);
        if (!user) {
            throw new Error();
        }

        req.token = token;
        console.log(decoded, user, req.token, req.userId);

        req.userId = user._id;
        console.log(decoded, user, req.token, req.userId);

        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};