'use strict';

import { Collection } from 'discord.js';

const MessageUtils = require('../utils/MessageUtils');

const guildModel = require('../models/Guild');
const userModel = require('../models/User');

const cooldowns = new Collection();

module.exports = {
    async handle(message, client) {
        if (message.author.bot) return;

        let guild = null;
        if (message.channel.type === 'text') guild = await guildModel.findOne({ id: message.guild.id });

        const prefix = guild == null ? 'v!' : guild.prefix;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (command == null) return;

        if (command.guildOnly && message.channel.type !== 'text') return MessageUtils.sendAndDelete(message.channel, 'I can\'t execute that command inside my DMs', 10);

        if(command.ownerOnly && message.guild !== null && message.author.id !== message.guild.owner.id) return MessageUtils.sendAndDelete(message.channel, 'This command is limited to the owner of the Guild', 10);

        if (command.args && !args.length) {
            let reply = 'This command requires arguments.';

            if (command.usage) reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;

            return MessageUtils.sendAndDelete(message.channel, reply, 10);
        }

        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) return MessageUtils.sendAndDelete(message.channel, `Please wait ${((expirationTime - now) / 1000).toFixed(1)} more second(s) before re-using the \`${command.name}\` command.`, 10);
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            userModel.findOneAndUpdate({ id: message.author.id }, {
                username: message.author.username,
                discrim: message.author.discriminator,
            }, { upsert: true });
            command.execute(message, args);
        }
        catch (error) {
            console.error(error);
            MessageUtils.sendAndDelete(message.channel, 'There was an error whilst typing to dispatch that command.', 10);
        }
    },
};