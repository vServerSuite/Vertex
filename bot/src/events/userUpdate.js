'use strict';

const userModel = require('../db/models/User');

module.exports = {
    async handle(user) {
        await userModel.update({
            username: user.username,
            discrim: user.discriminator,
        }, { where: { id: user.id } });
    },
};