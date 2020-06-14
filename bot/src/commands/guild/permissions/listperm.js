const MessageUtils = require('../../../utils/MessageUtils');

const commandPermissionModel = require('../../../db/models/permissions/CommandPermission');

module.exports = {
    name: 'listperm',
    description: 'Lists permissions for a command',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: true,
    usage: '<command>',
    requiresPermission: true,
    execute: async (message, args) => {
        const commandName = args[0];
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(command !== null) {
            if(!command.requiresPermission) {
                MessageUtils.sendAndDelete(message.channel, 'Everyone has access to this command by default', 10);
            }
            else {
                const permissions = await commandPermissionModel.findAll({ where: { guild: message.guild.id, command: commandName } });
                const permissionMap = permissions.map(permission => `\n- <@&${permission.role}> \`(${permission.role})\``);
                if(permissionMap.size > 0) {
                    const embedString = `Permissions for **v!${commandName}**: ${permissionMap.join()}`;
                    MessageUtils.send(message.channel, embedString);
                }
                else {
                    MessageUtils.sendAndDelete(message.channel, `No roles have been given access to this command.\n\nYou can give them access with **v!addperm ${commandName} <@role>**`, 10);
                }
            }
        }
        else {
            MessageUtils.sendAndDelete(message.channel, 'Command not found', 10);
        }
    },
};