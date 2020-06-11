const MessageUtils = require('../../utils/MessageUtils');

const guildModel = require('../../db/models/Guild');

module.exports = {
    name: 'prefix',
    description: 'Changes the prefix for the guild',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: true,
    usage: '<prefix>',
    execute: (message, args) => {
        guildModel.update({ prefix: args[0] }, { where: { id: message.guild.id } })
            .then(() => MessageUtils.sendAndDelete(message.channel, `The prefix for this guild has been updated to \`${args[0]}\``, 5))
            .catch(() => MessageUtils.sendAndDelete(message.channel, 'There was a problem whilst updating the prefix for this guild', 5));
    },
};