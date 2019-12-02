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
})

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

        isMatch.then(function(resultIsMatch){
            if (!resultIsMatch) {
                return next(new ErrorResponse('Invalid credentials', 401));
            }else{
                const token = resultUser.getSignedJwtToken();
                res.status(200).json({ success: true, token: token });
            }
        })
    });
})