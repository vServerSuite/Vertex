'use strict';

const userModel = require('../../db/models/User');

const MessageUtils = require('../../utils/MessageUtils');
const Permissions = require('discord.js').Permissions;

module.exports = {
    name: 'admin',
    description: 'Runs different administration commands',
    args: false,
    guildOnly: false,
    ownerOnly: false,
    execute: async (message, args) => {
        const user = await userModel.findOne({ where: { id: message.author.id } });
        if(user.coreTeam == true) {
            if(args.length > 0) {
                switch(args[0]) {
                case 'checkperms':
                    MessageUtils.send(message.channel, new Permissions(message.guild.members.cache.get(message.client.user.id).permissions).toArray().map(p => `\n- ${p}`).join(''));
                    break;
                case 'botinfo':
                    MessageUtils.send(message.channel, `Bot Info: \n- Guild Count: \`${message.client.guilds.cache.size}\`\n- Uptime: \`${process.uptime()}\``);
                    break;
                default:
                    MessageUtils.sendAndDelete(message.channel, 'Invalid Args', 10);
                    break;
                }
            }
            else {
                const embedMessage = 'Commands: \n- checkperms *(Checks the bot\'s permissions in the given server)*\n- botinfo *(Dumps information about the bot)*';
                MessageUtils.send(message.channel, embedMessage);
            }
        }
        else {
            MessageUtils.sendAndDelete(message.channel, 'You have to be a member of the vSuite Core Team to use this command', 10);
        }
    },
};