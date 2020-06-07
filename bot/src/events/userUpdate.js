'use strict';

const userModel = require('../models/User');

module.exports = {
    async handle(user) {
        await userModel.findOneAndUpdate({ id: user.id }, {
            username: user.username,
            discrim: user.discriminator,
        }, { upsert: true });
    },
};