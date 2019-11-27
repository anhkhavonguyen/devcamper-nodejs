const Bootcamp = require('../models/Bootcamp');

// @route GET /api/v1/bootcamps
exports.getBootcamps = async (req, res, next) => {
    try {
        var result = await Bootcamp.find();
        res.status(200).json({ success: true, count: result.length, data: result });
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

// @route GET /api/v1/bootcamps/:id
exports.getBootcamp = async (req, res, next) => {
    try {
        var id = req.params.id;
        var result = await Bootcamp.findById(id);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

// @route POST /api/v1/bootcamps
exports.createBootcamp = async (req, res, next) => {
    try {
        var request = req.body;
        const bootcamp = await Bootcamp.create(request);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}

// @route PUT /api/v1/bootcamps/:id
exports.updateBootcamp = async (req, res, next) => {
    try {
        var id = req.params.id;
        var request = req.body;
        const bootcamp = await Bootcamp.findByIdAndUpdate(id, request, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}

// @route DELETE /api/v1/bootcamps/:id
exports.deleteBootcamp = async (req, res, next) => {
    try {
        var id = req.params.id;
        const bootcamp = await Bootcamp.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}