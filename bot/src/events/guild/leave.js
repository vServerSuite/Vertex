'use strict';

const guildModel = require('../../models/Guild');

module.exports = {
    async handle(guild) {
        await guildModel.deleteOne({ id: guild.id });
    },
};