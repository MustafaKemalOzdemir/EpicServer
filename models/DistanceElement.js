const mongoose = require('mongoose');

const distanceElementSchema = mongoose.Schema({

    nextContainerId: {
        type: Number,
        required: true,
    },

    nextLatitude: {
        type: Number,
        required: true
    },

    nextLongitude: {
        type: Number,
        required: true
    },

    distanceShortest: {
        type: Number,
        require: true
    },

    distanceFormat: {
        type: String,
        require: true
    },

});

module.exports = {
    model: mongoose.model('DistanceSchema', distanceElementSchema),
    schema: distanceElementSchema
}