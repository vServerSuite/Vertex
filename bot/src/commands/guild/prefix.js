const MessageUtils = require('../../utils/MessageUtils');
const guildModel = require('../../models/Guild');

module.exports = {
    name: 'prefix',
    description: 'Changes the prefix for the guild',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: true,
    usage: '<prefix>',
    execute: (message, args) => {
        guildModel.findOneAndUpdate({ id: message.guild.id }, { prefix: args[0] }, error => {
            if(error) {
                console.log(error);
                MessageUtils.sendAndDelete(message.channel, 'There was a problem whilst updating the prefix for this guild', 5);
            }
            else {
                MessageUtils.sendAndDelete(message.channel, `The prefix for this guild has been updated to \`${args[0]}\``, 5);
            }
            message.delete({ timeout: 5 });
        });
    },
};