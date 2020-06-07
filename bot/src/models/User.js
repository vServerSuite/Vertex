'use strict';

import mongoose, { Schema } from 'mongoose';

require('mongoose-long')(mongoose);
const Long = Schema.Types.Long;

module.exports = global.db.model('User', new Schema({
    id: {
        type: Long,
        unique: true,
        required: true,
        dropDups: true,
    },
    username: {
        type: String,
        required: true,
    },
    discrim: {
        type: Number,
        required: true,
    },
    vSuiteCoreTeam: {
        type: Boolean,
        required: true,
        default: false,
    },
}));