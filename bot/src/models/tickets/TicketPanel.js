'use strict';

import mongoose, { Schema } from 'mongoose';

require('mongoose-long')(mongoose);
const Long = Schema.Types.Long;

module.exports = global.db.model('TicketPanel', new Schema({
    id: {
        type: Long,
        required: true,
        unique: true,
        dropDups: true,
    },
    guild: {
        type: Long,
        required: true,
    },
    channel: {
        type: Long,
        required: true,
    },
    create_category: {
        type: Long,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
    },
}));