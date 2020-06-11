'use strict';

import { MessageEmbed } from 'discord.js';
const { v4: uuidv4 } = require('uuid');

const guildModel = require('../models/Guild');
const ticketModel = require('../models/tickets/Ticket');

const EmbedGenerator = require('./EmbedGenerator');
const MessageUtils = require('../utils/MessageUtils');

module.exports = {
    getTotalTickets: (guildId, callback) => getTotalTickets(guildId, callback),
    getCloseMessage: async (ticketCloser, ticketId) => {
        const ticket = await ticketModel.findOne({ id: ticketId });
        const closeEmbed = EmbedGenerator.generate(`A ticket was closed by <@${ticketCloser}>.`);
        closeEmbed.addField('Id', ticket.id, true);
        closeEmbed.addField('Author', `<@${ticket.author}>`, true);
        closeEmbed.addField('Logs', `http://example.com/${ticket.guild}/logs/${ticket.id}`, true);
        return closeEmbed;
    },
    createTicket: async message => {
        createTicket(message.guild, message.channel, message.author);
    },
    createTicketFromReaction: async (messageReaction, user, categoryId) => {
        createTicket(messageReaction.message.guild, messageReaction.message.channel, user, categoryId);
    },
};

function getTotalTickets(guildId, callback) {
    ticketModel.countDocuments({ guild: guildId }).exec().then(count => callback(count));
}

async function createTicket(discordGuild, channel, user, categoryId = null) {
    const guild = await guildModel.findOne({ id: discordGuild.id });
    getTotalTickets(discordGuild.id, totalTickets => {
        const newTicketNumber = totalTickets + 1;
        MessageUtils.send(channel, 'Your ticket is being created...', ticketCreationMessage => {
            discordGuild.channels.create(`ticket-${newTicketNumber}`, {
                type: 'text',
                parent: categoryId == null ? guild.ticket.category.toString() : categoryId,
                permissionOverwrites: [
                    { id: discordGuild.roles.everyone.id, deny: ['VIEW_CHANNEL'] },
                    { id: user.id, allow: ['VIEW_CHANNEL'] },
                ],
            }).then(ticketChannel => {
                ticketModel.create({
                    id: uuidv4(),
                    guild: discordGuild.id,
                    author: user.id,
                    channel: ticketChannel.id,
                });
                ticketCreationMessage.edit(new MessageEmbed(ticketCreationMessage.embeds[0]).setDescription(`Your ticket has been created: <#${ticketChannel.id}>`));
                ticketCreationMessage.delete({ timeout: 10000 });
                MessageUtils.send(ticketChannel, guild.ticket.message);
                ticketChannel.send(`<@${user.id}>`).then(m => m.delete());
            });
        });
    });
}