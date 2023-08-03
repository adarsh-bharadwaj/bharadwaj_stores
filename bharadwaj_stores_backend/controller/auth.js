const { validationResult } = require("express-validator");
const User = require('../models/User');
const Otp = require('../models/Otp');
const { generateRefreshToken } = require('../config/refreshToken');
const { generateAccessToken } = require('../config/accessToken');
const { sendEmail } = require("../utils/sendEmail");
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error');
            error.statusCode = 422;
            error.stack = errors.array();
            throw error;
        }

        const email = req.body.email;
        const mobile = req.body?.mobile;

        const errorDataExists = (message) => {
            const error = new Error(message);
            error.statusCode = 409;
            error.stack = undefined;
            throw error;
        }

        const emailExists = await User.findOne({ email });

        if (!emailExists) {
            const mobileExists = await User.findOne({ mobile });
            if (!mobileExists) {
                const firstName = req.body?.firstName;
                const lastName = req.body?.lastName;
                const password = req.body?.password;
                const address = req.body?.address;



                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password,
                    mobile,
                    address
                });
                res.status(201).send({ message: "User Registered Successfully", userId: user._id });
            }
            else {
                errorDataExists("Mobile Number Already Exists In The Database");
            }
        }
        else {
            errorDataExists("Email Id Already Exists In The Database");
        }
    }
    catch (error) {
        console.log(error)
        next(error);
    }
};


exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        const errorDataNotExists = (code, message, field) => {
            let error = new Error(message);
            error.name = field
            error.statusCode = code;
            error.stack = undefined;
            throw error;
        }

        if (user) {
            console.log(await user.isPasswordMatched(password));
            if (await user.isPasswordMatched(password)) {
                const refreshToken = generateRefreshToken(user._id);
                const accessToken = generateAccessToken(user._id);

                const updatedUser = await User.findByIdAndUpdate(user._id, {
                    refreshToken: refreshToken
                }, { new: true }).select('_id firstName lastName mobile email address');

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 72 * 60 * 60 * 1000
                })
                res.json({ ...updatedUser.toJSON(), accessToken });
            }
            else {
                errorDataNotExists(401, "Password Does Not Match", "password");
            }
        }
        else {
            errorDataNotExists(404, "Email Id Not Found", "email");
        }
    }
    catch (error) {
        next(error);
    }
};

exports.verifyEmail = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Error");
            error.statusCode = 422;
            error.stack = errors.array();
            throw error;
        }

        const { email } = req.body;

        const userEmail = await Otp.findOne({ email });

        console.log(userEmail);
        // Generate a random OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        if (userEmail) {
            userEmail.otp = otp;
            userEmail.save();
        }
        else {
            const newUserEmail = await Otp.create({
                otp,
                email
            });

        }
        const mailOptions = {
            from: '"Bharadwaj Stores" <ashritha.adarsh@gmail.com>',
            to: email,
            subject: 'OTP for Email Verification',
            html: `
              <h1>OTP for Email Verification</h1>
              <p>Thank you for signing up!</p>
              <p>Your One-Time Password (OTP) is:</p>
              <h2>${otp}</h2>
              <p>Please enter this OTP to verify your email.</p>
              <p><e>Note:This Otp Will be Valid for only 10 mins</e></p>
            `,
        };
        const isEmailSent = await sendEmail(mailOptions, (status) => {
            if (status) {
                res.status(201).json({ message: "Otp has been sent to your email Id" });
            }
            else {
                const error = new Error("Please Try Again After Some Time");
                error.statusCode = 500;
                error.stack = undefined;
                throw error;
            }
        });
    }
    catch (error) {
        next(error)
    }
};

exports.verifyEmailOtp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Error");
            error.statusCode = 422;
            error.stack = errors.array();
            throw error;
        }
        const email = req.body.email;
        const otp = req.body.otp;
        const message = "Inavild Otp";

        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord || otpRecord.otp !== otp) {
            const error = new Error(message);
            error.statusCode = 400;
            error.stack = undefined;
            throw error;
        }

        const currentTime = new Date();
        if (currentTime > otpRecord.validTill) {
            const error = new Error("OTP Expired");
            error.statusCode = 400;
            error.stack = undefined;
            throw error;
        }

        await Otp.deleteOne({ email });

        res.status(200).json({ message: 'Email verification successful' });
    }
    catch (error) {
        next(error);
    }

};

exports.checkEmailMobile = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Error");
            error.statusCode = 422;
            error.stack = errors.array();
            throw error;
        }
        const { email } = req.body;
        const { mobile } = req.body;

        let user = await User.findOne({ email });

        let response = []

        if (!user) {
            response = [{ isExists: false, message: "Email Id Doesn't Exists In The Database", field: "email" }];
        }
        else {
            response = [{ isExists: true, message: "Email Id Already Exists In The Database", field: "email" }];
        }

        user = await User.findOne({ mobile });

        if (!user) {
            response = [...response, { isExists: false, message: "Mobile No. Doesn't Exists In The Database", field: "mobile" }];
        }
        else {
            response = [...response, { isExists: true, message: "Mobile No. Already Exists In The Database", field: "mobile" }];
        }

        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
}

exports.handleRefreshToken = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        const errorHandler = (message, code, stack = undefined) => {
            let error = new Error(message);
            error.statusCode = code;
            error.stack = undefined;
            throw error;
        }
        if (!cookie?.refreshToken) {
            errorHandler("No Refresh Token in Cookies", 404);
        }

        const refreshToken = cookie.refreshToken;
        console.log(refreshToken);
        const user = await User.findOne({ refreshToken });

        if (!user) {
            errorHandler("No Refresh Token in db or not matched", 404)
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            console.log(user._id);
            console.log(decoded.id);
            if (error || user?._id.toString() !== decoded.id) {
                errorHandler("Invalid Refresh Token", 401);
            }
            const accessToken = generateAccessToken(user?._id);
            res.json({ accessToken });
        })
    }
    catch (error) {
        next(error);
    }
}

exports.forgotPasswordOtp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Error");
            error.statusCode = 422;
            error.stack = errors.array();
            throw error;
        }
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            let error = new Error("Email Id doesn't exists in the database");
            error.statusCode = 404;
            error.stack = undefined;
            throw error;
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp)
        user.passwordResetOtp = otp;
        await user.updateOtpExpire();
        await user.save();
        console.log(user);


        const mailOptions = {
            from: '"Bharadwaj Stores" <ashritha.adarsh@gmail.com>',
            to: email,
            subject: 'OTP for Password Reset',
            html: `
                  <h1>OTP for Password Reset</h1>
                  <p>Your One-Time Password (OTP) is:</p>
                  <h2>${otp}</h2>
                  <p>Please enter this OTP to reset your password.</p>
                  <p><e>Note:This Otp Will be Valid for only 10 mins</e></p>
                `,
        };
        const isEmailSent = await sendEmail(mailOptions, (status) => {
            if (status) {
                res.status(201).json({ message: "Otp has been sent to your email Id" });
            }
            else {
                const error = new Error("Please Try Again After Some Time");
                error.statusCode = 500;
                error.stack = undefined;
                throw error;
            }
        });
    }
    catch (error) {
        next(error);
    }
};


exports.verifyForgotPassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Error");
            error.statusCode = 422;
            error.stack = errors.array();
            throw error;
        }
        const email = req.body.email;
        const otp = req.body.otp;
        const password = req.body.password;
        const message = "Inavild Otp";

        const user = await User.findOne({ email });
        if (!user || user.passwordResetOtp != otp) {
            console.log("Hi");
            const error = new Error(message);
            error.statusCode = 400;
            error.stack = undefined;
            throw error;
        }

        const currentTime = new Date();
        if (currentTime > user.passwordResetExpires) {
            console.log("He");
            const error = new Error("OTP Expired");
            error.statusCode = 400;
            error.stack = undefined;
            throw error;
        }

        await User.findOneAndUpdate({ email }, {
            passwordResetOtp: undefined,
            passwordResetExpires: undefined,
            password
        });

        res.status(200).json({ message: 'Password Updated Successfully' });
    }
    catch (error) {
        next(error);
    }

};

