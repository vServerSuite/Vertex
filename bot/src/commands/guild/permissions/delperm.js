const MessageUtils = require('../../../utils/MessageUtils');

const commandPermissionModel = require('../../../db/models/permissions/CommandPermission');

module.exports = {
    name: 'delperm',
    description: 'Removes a permission from a role',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: true,
    usage: '<command> <@role>',
    requiresPermission: true,
    execute: async (message, args) => {
        if(args.length === 2) {
            const commandName = args[0];
            const role = MessageUtils.getRoleFromMention(message.guild, args[1]);
            if(!role) {
                MessageUtils.sendAndDelete(message.channel, 'You did not mention a role', 10);
            }
            else {
                const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if(command !== null) {
                    const commandPermission = await commandPermissionModel.findOne({ where: { guild: message.guild.id, command: commandName, role: role.id } });
                    if(commandPermission !== null) {
                        await commandPermissionModel.destroy({ where: { guild: message.guild.id, command: commandName, role: role.id } });
                        MessageUtils.send(message.channel, `<@&${role.id}> does not have permission to use **v!${commandName}** anymore.`);
                    }
                    else {
                        MessageUtils.sendAndDelete(message.channel, `<@&${role.id}> does not have access to **v!${commandName}**`, 10);
                    }
                }
                else {
                    MessageUtils.sendAndDelete(message.channel, 'Command could not be found', 10);
                }
            }
        }
        else {
            MessageUtils.sendAndDelete(message.channel, 'Invalid usage. Usage: v!delperm <command> <role> \nUse v!help to get a list of commands', 10);
        }
    },
};