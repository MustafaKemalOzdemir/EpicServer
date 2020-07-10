const mongoose = require('mongoose');

const containerSchema = mongoose.Schema({

    containerId: {
        type: Number,
        required: true,
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    fullness: {
        type: Number,
        require: true
    },

    distance: [{
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
    }]

});

module.exports = {
    model: mongoose.model('Containers', containerSchema),
    schema: containerSchema
}