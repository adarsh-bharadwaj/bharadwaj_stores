const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
// const crypto = require('crypto');
const cron = require('node-cron')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: [{
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    }],
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
        type: String,
    },
    passwordResetOtp: Number,
    passwordResetExpires: Date,
}, {
    timeStamp: true
})


userSchema.pre(["save", "update"], async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// userSchema.methods.genPassResetToken = async function () {
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
//     this.passwordResetExpires = Date.now() + 30 * 60 * 1000;//10mins
//     return resetToken;
// }

// Pre hook for both save and update operations
userSchema.methods.updateOtpExpire = async function () {
    const tenMinutesLater = moment().tz('Asia/Kolkata').add(10, 'minutes').toDate();
    this.passwordResetExpires = tenMinutesLater;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

// Delete expired records every 24 hours
cron.schedule('0 0 * * *', async () => {
    const currentTime = moment().tz('Asia/Kolkata').toDate();
    await User.updateMany({ passwordResetExpires: { $lte: currentTime } });
});