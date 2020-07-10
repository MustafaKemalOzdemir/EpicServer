const express = require('express');
const router = express.Router();
const Container = require('../models/Container').model;

router.get('/', async(req, res) => {
    Container.find({}, (err, containers) => {
        if (err) {
            return res.status(200).json({
                success: false,
                error: err,
            });
        } else {
            return res.status(200).json({
                success: true,
                containers: containers,
            });
        }
    });
});



router.post('/updateDistance', (req, res) => {
    if (req.body.containerId === undefined || req.body.nextContainerId === undefined || !req.body.nextLatitude || !req.body.nextLongitude || req.body.distanceShortest === undefined) {
        res.status(200).json({
            success: false,
            message: "Check Request Paramaters"
        });
        return;
    }
    var distanceFormat = 'KM';
    if (req.body.distanceFormat) {
        distanceFormat = req.body.distanceFormat;
    }

    Container.findOne({ containerId: req.body.containerId }, function(err, targetContainer) {
        if (err) {
            return res.status(200).json({
                success: false,
                error: err,
            });
        }
        const existanceCheck = targetContainer.distance.find(container => container.nextContainerId === req.body.nextContainerId);
        console.log(typeof existanceCheck);

        if (existanceCheck === undefined) {
            targetContainer.distance.push({
                nextContainerId: req.body.nextContainerId,
                nextLatitude: req.body.nextLatitude,
                nextLongitude: req.body.nextLongitude,
                distanceShortest: req.body.distanceShortest,
                distanceFormat: distanceFormat,
            });
            Container(targetContainer).save(function(err, savedContainer) {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        error: err,
                    });
                }
                return res.status(200).json({
                    success: true,
                    savedContainer: savedContainer,
                });
            });
        } else {
            for (var i = 0; i < targetContainer.distance.length; i++) {
                if (targetContainer.distance[i].nextContainerId === req.body.nextContainerId) {
                    targetContainer.distance.splice(i, 1);
                    i--;
                }
            }
            targetContainer.distance.push({
                nextContainerId: req.body.nextContainerId,
                nextLatitude: req.body.nextLatitude,
                nextLongitude: req.body.nextLongitude,
                distanceShortest: req.body.distanceShortest,
                distanceFormat: distanceFormat,
            });

            Container(targetContainer).save(function(err, savedContainer) {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        error: err,
                    });
                }
                return res.status(200).json({
                    success: true,
                    deletedDistance: existanceCheck,
                    savedContainer: savedContainer,
                });
            });
        }
    });
});



module.exports = router;