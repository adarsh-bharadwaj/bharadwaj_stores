const mongoose = require("mongoose");
const moment = require('moment-timezone');
const cron = require('node-cron');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    validTill: {
        type: Date,
    }
}, {
    timeStamp: true
});

// Pre hook for both save and update operations
otpSchema.pre(['save', 'update'], function (next) {
    const tenMinutesLater = moment().tz('Asia/Kolkata').add(10, 'minutes').toDate();
    this.validTill = tenMinutesLater;
    next();
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;

console.log("Hello")

// Delete expired records every 24 hours
cron.schedule('0 0 * * *', async () => {
    const currentTime = moment().tz('Asia/Kolkata').toDate();
    await Otp.deleteMany({ validTill: { $lte: currentTime } });
});