'use strict';

const guildModel = require('../../db/models/Guild');

module.exports = {
    async handle(oldGuild, newGuild) {
        await guildModel.update({
            owner: newGuild.owner.id,
            name: newGuild.name,
        }, { where: { id: oldGuild.id } });
    },
};