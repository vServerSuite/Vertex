'use strict';

const customCommandModel = require('../../db/models/CustomCommand');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'listcom',
    description: 'Lists all custom commands for the server',
    args: false,
    guildOnly: true,
    ownerOnly: false,
    requiresPermission: true,
    execute: async (message, args) => {
        const customCommands = await customCommandModel.findAll({ where: { guild: message.guild.id } });
        const customCommandsMap = customCommands.map(cmd => `\n- \`${cmd.trigger}\``);

        MessageUtils.send(message.channel, `Custom commands for **${message.guild.name}**: ${customCommandsMap.join(' ')}`);
        message.delete();
    },
};