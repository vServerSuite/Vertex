'use strict';

const customCommandModel = require('../../db/models/CustomCommand');
const guildModel = require('../../db/models/Guild');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'delcom',
    description: 'Removes a custom command from the server',
    args: true,
    guildOnly: true,
    ownerOnly: false,
    usage: '<trigger>',
    requiresPermission: true,
    execute: async (message, args) => {
        const guild = await guildModel.findOne({ where: { id: message.guild.id } });
        const command = args[0];
        const customCommand = await customCommandModel.findOne({ where: { guild: message.guild.id, trigger: command } });
        if(customCommand !== null) {
            await customCommandModel.destroy({ where: { guild: message.guild.id, trigger: command } });
            MessageUtils.send(message.channel, `The command \`${guild.prefix + command}\` has been removed from **${message.guild.name}**`);
        }
        else {
            MessageUtils.sendAndDelete(message.channel, `A command with the trigger \`${command}\` does not exist in this guild`, 10);
        }
        message.delete();
    },
};