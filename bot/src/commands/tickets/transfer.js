'use strict';

const ticketModel = require('../../models/tickets/Ticket');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'transfer',
    description: 'Transfers a ticket',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    usage: '<@user>',
    execute: async (message, args) => {
        const ticket = await ticketModel.findOne({ channel: message.channel.id });
        if(ticket !== null) {
            if (args[0]) {
                const user = MessageUtils.getUserFromMention(message.client, args[0]);
                if (!user) {
                    MessageUtils.sendAndDelete(message.channel, 'Please use a proper mention if you want to transfer a ticket to another user.', 10);
                }
                else {
                    MessageUtils.send(message.channel, `This ticket is now being dealt with by <@${user.id}>`);
                    await ticketModel.findOneAndUpdate({ id: ticket.id }, { assignedStaff: user.id });
                }
            }
            else {
                MessageUtils.sendAndDelete(message.channel, 'You need to specify a user to transfer the Ticket to.', 10);
            }
        }
        else {
            MessageUtils.sendAndDelete(message.channel, 'This is not a ticket channel', 10);
        }
        message.delete({ timeout: 10000 });

    },
};