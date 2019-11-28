const Bootcamp = require('../models/Bootcamp');

class BootcampService {
    constructor() { }

    async getBootcamps() {
        return await Bootcamp.find();
    };

    async getBootcamp(id) {
        return await Bootcamp.findById(id);
    }

    async createBootcamp(bootcamp) {
        return await Bootcamp.create(bootcamp);
    }

    async updateBootcamp(id, bootcamp) {
        return await Bootcamp.findByIdAndUpdate(id, bootcamp, {
            new: true,
            runValidators: true
        });
    }

    async deleteBootcamp(id) {
        return await Bootcamp.findByIdAndDelete(id);
    }
};

module.exports = BootcampService;