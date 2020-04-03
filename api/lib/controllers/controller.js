'use strict';

const axios = require('axios');
const imageServer = require('../config').imageServer;
const winston = require('winston');

let LostPet = require('../shared/models/lost_pet');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

exports.getLostPets = (req, res) => {
    LostPet.getAllRecords((err, record) => {
        if (err) logger.error('Error listing all lost pets');
        res.status(200).json(record);
    });
};

exports.getLastPetRecords = (req, res) => {
    LostPet.getLastRecords((err, record) => {
        if (err) logger.error('Error listing last records');
        res.status(200).json(record);
    });
};

exports.recordLost = function(req, res) {
    const { description, photo, latitude, longitude } = req.body;
    let photo_title = assignImageTitle(latitude, longitude);
    sendImageCode(photo, photo_title);

    let lostPet = new LostPet({ description, photo: `/images/${photo_title}.png`, latitude, longitude });

    if (!lostPet.description || !lostPet.photo || !lostPet.latitude || !lostPet.longitude) {
        res.status(400).send({ error: true, message: 'Please provide all information' });
    } else {
        LostPet.recordLost(lostPet, function(err, record) {
            if (err) logger.error('Error recording lost pet');
            res.status(200).json(record);
        });
    }
};

function assignImageTitle(latitude, longitude) {
    let autoTitle = `${Math.abs(latitude)}${Math.abs(longitude)}`;
    return autoTitle.split('.').join('');
}

function sendImageCode(encodedImage, title) {
    let server = `http://${imageServer.host}:${imageServer.port}`;
    axios.post(server + '/images', {
            image: encodedImage,
            title: title
        })
        .then((response) => {
            logger.info('Sending request to Image Server');
        })
        .catch((error) => {
            logger.error('Error sending request to Image Server');
        });
}
