'use strict';

import mongoose, { Schema } from 'mongoose';

require('mongoose-long')(mongoose);
const Long = Schema.Types.Long;

module.exports = global.db.model('TicketMessage', new Schema({
    id: {
        type: Long,
        required: true,
        unique: true,
        dropDups: true,
    },
    author: {
        type: Long,
        required: true,
    },
    ticket: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    content: {
        type: String,
    },
    attachments: {
        type: [String],
    },
}));