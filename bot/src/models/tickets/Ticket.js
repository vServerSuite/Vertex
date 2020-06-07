'use strict';

import mongoose, { Schema } from 'mongoose';

require('mongoose-long')(mongoose);
const Long = Schema.Types.Long;

module.exports = global.db.model('Ticket', new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    guild: {
        type: Long,
        required: true,
    },
    author: {
        type: Long,
        required: true,
    },
    channel: {
        type: Long,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    resolved: {
        type: Date,
    },
    assignedStaff: {
        type: Long,
    },
}));