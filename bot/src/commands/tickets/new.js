'use strict';

import { MessageEmbed } from 'discord.js';
const { v4: uuidv4 } = require('uuid');

const guildModel = require('../../models/Guild');
const ticketModel = require('../../models/tickets/Ticket');

const MessageUtils = require('../../utils/MessageUtils');
const TicketUtils = require('../../utils/TicketUtils');

module.exports = {
    name: 'new',
    description: 'Opens a new ticket in the guild',
    aliases: ['open', 'create'],
    args: false,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    usage: '<reason>',
    execute: async (message) => {
        const guild = await guildModel.findOne({ id: message.guild.id });
        TicketUtils.getTotalTickets(message.guild.id, totalTickets => {
            const newTicketNumber = totalTickets + 1;
            MessageUtils.send(message.channel, 'Your ticket is being created...', ticketCreationMessage => {
                message.guild.channels.create(`ticket-${newTicketNumber}`, {
                    type: 'text',
                    parent: guild.ticket.category,
                    permissionOverwrites: [
                        { id: message.guild.roles.everyone.id, deny: ['VIEW_CHANNEL'] },
                        { id: message.author.id, allow: ['VIEW_CHANNEL'] },
                    ],
                }).then(ticketChannel => {
                    ticketModel.create({
                        id: uuidv4(),
                        guild: message.guild.id,
                        author: message.author.id,
                        channel: ticketChannel.id,
                    });
                    ticketCreationMessage.edit(new MessageEmbed(ticketCreationMessage.embeds[0]).setDescription(`Your ticket has been created: <#${ticketChannel.id}>`));
                    ticketCreationMessage.delete({ timeout: 10000 });
                    MessageUtils.send(ticketChannel, guild.ticket.message);
                    ticketChannel.send(`<@${message.author.id}>`).then(m => m.delete());
                });
            });
        });
    },
};