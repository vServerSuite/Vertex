'use strict';

const customCommandModel = require('../../db/models/CustomCommand');
const guildModel = require('../../db/models/Guild');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'addcom',
    description: 'Adds a custom command to the server',
    args: true,
    guildOnly: true,
    ownerOnly: false,
    usage: '<trigger> <response>',
    requiresPermission: true,
    execute: async (message, args) => {
        const guild = await guildModel.findOne({ where: { id: message.guild.id } });
        if(args.length >= 2) {
            const command = args[0];
            const customCommand = await customCommandModel.findOne({ where: { guild: message.guild.id, trigger: command } });
            if(customCommand === null) {
                const response = args;
                response.splice(0, 1);

                await customCommandModel.create({
                    guild: message.guild.id,
                    trigger: command,
                    response: response.join(' '),
                });
                MessageUtils.send(message.channel, `New command created for \`${message.guild.name}\`: \n- Trigger: \`${guild.prefix + command}\` \n- Response: \`${response.join(' ')}\``);
            }
            else {
                MessageUtils.sendAndDelete(message.channel, `A command with the trigger \`${command}\` already exists in this guild`, 10);
            }
        }
        else {
            MessageUtils.sendAndDelete(message.channel, `Invalid Usage. Correct usage is: \`${guild.prefix}addcom <trigger> <response>\``, 10);
        }
        message.delete();
    },
};