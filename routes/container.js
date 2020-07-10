const express = require('express');
const router = express.Router();
const Container = require('../models/Container').model;

router.get('/', async(req, res) => {
    const containers = await Container.find();
    res.status(200).json(containers);
});

router.post('/addContainer', async(req, res) => {

    if (req.body.containerId === undefined || !req.body.latitude || !req.body.longitude) {
        res.status(200).json({
            success: false,
            message: "Check Request Paramaters"
        });
        return;
    }

    var fullness = 0;
    if (req.body.fullness) {
        fullness = req.body.fullness;
    }

    const existanceCheck = await Container.find({ containerId: req.body.containerId });

    if (Object.keys(existanceCheck).length == 0) {
        console.log('New Entry');
        const container = new Container({
            containerId: req.body.containerId,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            fullness: fullness,
            distance: []
        });
        try {
            const savedContainer = await container.save();
            res.status(200).json({
                success: true,
                message: 'Container has been successfully inserted!',
                container: savedContainer
            })

        } catch (error) {
            res.status(200).json({
                success: false,
                message: error
            });
        }
    } else {
        res.status(200).json({
            status: false,
            message: "Container exist"
        })
    }
});

router.post('/removeContainer', async(req, res) => {
    if (req.body.containerId === undefined) {
        res.status(200).json({
            success: false,
            message: "Check Request Paramaters"
        });
        return;
    }

    try {
        const result = await Container.remove({ containerId: req.body.containerId });
        res.status(200).json({
            success: true,
            deletedContainer: result
        });

    } catch (error) {
        res.status(200).json({
            success: false,
            error: error
        });
    }

});

module.exports = router;