'use strict';

module.exports = (app) => {
    const controller = require('../controllers/controller');

    // Controller Routes
    app.route('/lostPets')
        .get(controller.getLostPets)
        .post(controller.recordLost);

    app.route('/lastRecords')
        .get(controller.getLastPetRecords);
};
