const jwt = require('jsonwebtoken');
const asynchHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');

//TODO: REFACTOR TO SERVICE
const User = require('../models/User');

exports.protect = asynchHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // else if (req.cookie.token){
    //     token = req.cookie.token
    // }

    //Make sure token exits
    if (!token) {
        return next(new ErrorResponse('Not authorize to access', 401));
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorize to access', 401));
    }
});

//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorize`, 403));
        }
        next();
    }
}


