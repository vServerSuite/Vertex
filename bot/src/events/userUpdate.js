'use strict';

const userModel = require('../db/models/User');

module.exports = {
    async handle(user) {
        await userModel.upsert({
            id: user.id,
            username: user.username,
            discrim: user.discriminator,
        });
    },
};