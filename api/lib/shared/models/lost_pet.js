const database = require('../../database');

// Object constructor
let LostPet = function(lostPet) {
    this.description = lostPet.description;
    this.photo = lostPet.photo;
    this.latitude = lostPet.latitude;
    this.longitude = lostPet.longitude;
};


// Object Methods
LostPet.getAllRecords = (result) => {
    database.query('SELECT * FROM lost_pet ORDER BY id ASC', (err, res) => {
        if (err) {
            result(null, err);
        } else {
            result(null, res.rows);
        }
    });
};

LostPet.getLastRecords = (result) => {
    database.query('SELECT * FROM lost_pet ORDER BY ID DESC LIMIT 10', (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res.rows);
        }
    });
};

LostPet.recordLost = (record, result) => {
    let data = [record.description, record.photo, record.latitude, record.longitude];
    database.query('INSERT INTO lost_pet (description, photo, latitude, longitude) VALUES ($1, $2, $3, $4)', data, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

module.exports = LostPet;
