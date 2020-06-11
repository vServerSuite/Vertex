'use strict';

const ticketMessageModel = require('../../db/models/tickets/TicketMessage');
const ticketModel = require('../../db/models/tickets/Ticket');

module.exports = {
    async handle(oldMessage, newMessage) {
        const ticket = await ticketModel.findOne({ where: { channel: newMessage.channel.id } });
        if(ticket !== null) {
            await ticketMessageModel.create({
                messageId: newMessage.id,
                author: newMessage.author.id,
                ticket: ticket.id,
                content: newMessage.content == (null || '') ? newMessage.embeds == null ? '' : newMessage.embeds[0].description : newMessage.cleanContent,
                attachments: newMessage.attachments == null ? [] : newMessage.attachments.map(attachment => attachment.attachment),
            });
        }
    },
};