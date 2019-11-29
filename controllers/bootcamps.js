const ErrorResponse = require('../utils/errorResponse');
const BootcampService = require('../services/bootcampService');
const AsynHandler = require('../middleware/async');

// @route GET /api/v1/bootcamps
exports.getBootcamps = AsynHandler(async (req, res, next) => {
    var _bootcampService = new BootcampService();
    let result = await _bootcampService.getBootcamps(req, res, next);
    res.status(200).json(result);
});

// @route GET /api/v1/bootcamps/:id
exports.getBootcamp = AsynHandler(async (req, res, next) => {
    var id = req.params.id;
    var _bootcampService = new BootcampService();
    var result = await _bootcampService.getBootcamp(id);

    if (!result) {
        // Next for Express handle error and using custom Error response
        return next(new ErrorResponse(`Not found ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: result });
});

// @route POST /api/v1/bootcamps
exports.createBootcamp = AsynHandler(async (req, res, next) => {
    var request = req.body;
    var _bootcampService = new BootcampService();
    var bootcamp = await _bootcampService.createBootcamp(request);

    res.status(201).json({
        success: true,
        data: bootcamp
    });
});

// @route PUT /api/v1/bootcamps/:id
exports.updateBootcamp = AsynHandler(async (req, res, next) => {
    var _bootcampService = new BootcampService();
    var bootcamp = await _bootcampService.updateBootcamp(req.params.id, req.body);

    res.status(201).json({
        success: true,
        data: bootcamp
    });

});

// @route DELETE /api/v1/bootcamps/:id
exports.deleteBootcamp = AsynHandler(async (req, res, next) => {
    var _bootcampService = new BootcampService();
    await _bootcampService.deleteBootcamp(req.params.id);
    res.status(201).json({
        success: true,
        data: {}
    });
});