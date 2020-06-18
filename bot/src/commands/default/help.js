'use strict';

const commandPermissionModel = require('../../db/models/permissions/CommandPermission');

module.exports = {
    name: 'help',
    description: 'List all commands or info about a specific command',
    aliases: ['commands', 'commandlist'],
    args: false,
    cooldown: 5,
    guildOnly: false,
    ownerOnly: false,
    usage: '<command>',
    execute: async (message, args) => {
        const data = [];
        const {
            commands,
        } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            const permissionModels = await commandPermissionModel.findAll({ where: { guild: message.guild.id } });
            await commands.forEach(async command => {
                const permissionMap = permissionModels.length == 0 ? [] : permissionModels.find(permission => permission.command === command.name).map(permission => permission.role);
                const hasPermission = command.requiresPermission ? message.author.id === message.guild.owner.id || message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.some(role => permissionMap.includes(role.id)) : true;

                data.push(`- ${!hasPermission ? '~~' : ''}**v!${command.name}**: *${command.description}*${!hasPermission ? '~~' : ''}`);
            });
            data.push('\n\nIf a command is struck through, it means that you do not have permission to use it');
            data.push('You can send `v!help [command name]` to get info on a specific command!');

            return message.author.send(data, {
                split: true,
            })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** v!${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, {
            split: true,
        });
    },
};