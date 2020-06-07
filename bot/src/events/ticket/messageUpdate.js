'use strict';

const ticketMessageModel = require('../../models/tickets/TicketMessage');
const ticketModel = require('../../models/tickets/Ticket');

module.exports = {
    async handle(oldMessage, newMessage) {
        const ticket = await ticketModel.findOne({ channel: newMessage.channel.id });
        if(ticket !== null) {
            const content = newMessage.content == '' ? newMessage.embeds == null ? null : newMessage.embeds[0].description : newMessage.cleanContent;
            await ticketMessageModel.findOneAndUpdate({ id: newMessage.channel.id }, { content: content });
        }
    },
};