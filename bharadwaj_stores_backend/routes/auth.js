const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const { body } = require('express-validator')


router.post('/registeruser',
    body('firstName').notEmpty().withMessage('First name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('mobile').notEmpty().withMessage('Mobile number is required').custom((value) => {
        return value.length == 10 ? true : false
    }).withMessage('Invalid mobile number'),
    body('password').notEmpty().withMessage('Password is required')
    , authController.registerUser);

router.post('/loginuser',
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
    , authController.loginUser);

router.post('/verifyemail',
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    authController.verifyEmail);

router.post('/verifyemailotp',
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('otp').notEmpty().withMessage('Otp is required'),
    authController.verifyEmailOtp);

router.post('/checkemailmobile',
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('mobile').notEmpty().withMessage('Mobile number is required').custom((value) => {
        return value.length == 10 ? true : false
    }).withMessage('Invalid mobile number'),
    authController.checkEmailMobile);

router.post('/refreshtoken', authController.handleRefreshToken);

router.post('/forgotpassword',
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    authController.forgotPasswordOtp
)

router.post('/forgotpasswordreset', authController.verifyForgotPassword);


module.exports = router;