'use strict';

const EmbedGenerator = require('../../utils/EmbedGenerator');
const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'userinfo',
    description: 'Displays information about a user',
    args: false,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    usage: '<@user>',
    execute: (message, args) => {
        let userEmbed;
        if (args[0]) {
            const user = MessageUtils.getUserFromMention(message.client, args[0]);
            const member = message.guild.member(user);
            if (!user) {
                MessageUtils.sendAndDelete(message.channel, 'Please use a proper mention if you want to see someone else\'s user info.', 10);
            }
            else {
                userEmbed = EmbedGenerator.generate(`User info for <@${user.id}>`)
                    .addField('User Id', user.id, true)
                    .addField('Server Join Date', member.joinedAt, true)
                    .addField('Account Creation Date', user.createdAt, true)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png' }));
            }
        }
        else {
            userEmbed = EmbedGenerator.generate(`User info for <@${message.author.id}>`)
                .addField('User Id', message.author.id, true)
                .addField('Server Join Date', message.member.joinedAt, true)
                .addField('Account Creation Date', message.author.createdAt, true)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));
        }
        message.channel.send(userEmbed);
        message.delete({ timeout: 10000 });
    },
};