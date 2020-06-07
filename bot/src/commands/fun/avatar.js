'use strict';

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'avatar',
    description: 'Gets the avatar of the given user',
    args: false,
    cooldown: 10,
    guildOnly: false,
    ownerOnly: false,
    usage: '<@user>',
    execute: (message, args) => {
        const avatarOptions = { dynamic: true, format: 'png' };
        if (args[0]) {
            const user = MessageUtils.getUserFromMention(message.client, args[0]);
            if (!user) {
                MessageUtils.sendAndDelete(message.channel, 'Please use a proper mention if you want to see someone else\'s avatar.', 10);
            }
            else {
                MessageUtils.sendWithImage(message.channel, `<@${user.id}>'s Avatar`, user.displayAvatarURL(avatarOptions));
            }
        }
        else {
            MessageUtils.sendWithImage(message.channel, `<@${message.author.id}>'s Avatar`, message.author.displayAvatarURL(avatarOptions));
        }
        message.delete({ timeout: 10000 });
    },
};