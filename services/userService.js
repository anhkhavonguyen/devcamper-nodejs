const User = require('../models/User');
const advancedResults = require('../middleware/advancedResult');

class UserService {
    constructor() { }

    async Create(name, email, password, role) {
        return await User.create({ name, email, password, role });
    }

    async GetByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }
};

module.exports = UserService;