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
        const user = args[0] == null ? message.author : MessageUtils.getUserFromMention(message.client, args[0]);
        const member = message.guild.member(user);

        if(!user) {
            MessageUtils.sendAndDelete(message.channel, 'Please use a proper mention if you want to see someone else\'s user info.', 10);
        }
        else {
            message.channel.send(EmbedGenerator.generate(`User info for <@${user.id}>`)
                .addField('User Tag', user.tag, true)
                .addField('Nickname', member.nickname === undefined ? user.username : member.nickname, true)
                .addField('User Id', user.id, true)
                .addField('Status', user.presence.status, true)
                .addField('Server Join Date', member.joinedAt, true)
                .addField('Account Creation Date', user.createdAt, true)
                .addField('Roles', member.roles.cache.map(r => `<@&${r.id}>`).join(', '), false)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png' })));
        }
        message.delete({ timeout: 10000 });
    },
};