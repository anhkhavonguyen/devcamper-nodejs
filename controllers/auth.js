const ErrorResponse = require('../utils/errorResponse');
const AsynHandler = require('../middleware/async');
const UserService = require('../services/userService');

// @route POST /api/v1/auth Register
exports.register = AsynHandler(async (req, res, next) => {

    const { name, email, password, role } = req.body;
    var _userService = new UserService();

    //Create User
    const user = _userService.Create(name, email, password, role);
    user.then(function (resultUser) {
        //Create token
        const token = resultUser.getSignedJwtToken();
        res.status(200).json({ success: true, token: token });
    })
        .catch(err => console.log(err));
});

// @route POST /api/v1/user log in
exports.login = AsynHandler(async (req, res, next) => {
    const { email, password } = req.body;
    var _userService = new UserService();

    //Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password'), 400);
    }

    //Check for user
    var user = _userService.GetByEmail(email);

    user.then(function (resultUser) {
        if (!resultUser) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        //check if password matched
        const isMatch = resultUser.matchPassword(password);

        isMatch.then(function (resultIsMatch) {
            if (!resultIsMatch) {
                return next(new ErrorResponse('Invalid credentials', 401));
            } else {
                sendTokenResponse(resultUser, 200, res)
            }
        })
    });
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.sucure = true;
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
}


//Get current user -- private
exports.getMe = AsynHandler(async (req, res, next) => {
    var _userService = new UserService();
    var data = _userService.GetById(req.user.id);

    data.then(function (resul) {
        if (resul) {
            res.status(200).json({
                success: true,
                data: resul
            });
        }
    });
});