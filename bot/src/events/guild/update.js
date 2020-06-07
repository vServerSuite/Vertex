'use strict';

const guildModel = require('../../models/Guild');

module.exports = {
    handle(oldGuild, newGuild) {
        guildModel.findOneAndUpdate({ id: oldGuild.id }, {
            owner: newGuild.owner.id,
            name: newGuild.name,
            icon: newGuild.icon,
        }, { upsert: true });
    },
};