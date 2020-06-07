'use strict';

import mongoose, { Schema } from 'mongoose';

require('mongoose-long')(mongoose);
const Long = Schema.Types.Long;

module.exports = global.db.model('Guild', new Schema({
    id: {
        type: Long,
        unique: true,
        required: true,
        dropDups: true,
    },
    owner: {
        type: Long,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
        default: 'v!',
    },
    ticket: {
        category: {
            type: Long,
            required: true,
            default: 0,
        },
        limit: {
            type: Number,
            required: true,
            default: 5,
            min: 1,
            max: 10,
        },
        message: {
            type: String,
            required: true,
            default: 'Thank you for opening a ticket. Our support team will be with you soon',
        },
    },
}));