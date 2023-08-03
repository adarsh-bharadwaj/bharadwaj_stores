import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, ScrollView,Alert } from 'react-native';
import StatusBar from '../../components/StatusBar';
import { forgotPassScreenStyles } from './styles';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { emailValidation } from '../../utils/validation/email';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { passwordValidation } from '../../utils/validation/password';
import { confirmPasswordValidation } from '../../utils/validation/confirmPassword';
import { getForgotPassOtp } from '../../services/getForgotPassOtp';
import { forgotPassReset } from '../../services/forgotPassReset';


const formInit = {
    otp: '',
    password: '',
    confirmPassword: ''
}

const formReducer = (state, action) => {
    switch (action.field) {
        case 'otp':
            return { ...state, otp: action.value }
        case 'password':
            return { ...state, password: action.value };
        case 'confirmPassword':
            return { ...state, confirmPassword: action.value }
        case 'all':
            return action.value;

        default:
            return formInit;
    }
}

const ForgotPasswordScreen = ({navigation}) => {
    const styles = forgotPassScreenStyles();
    const dispatch = useDispatch();

    const [email, setEmail] = useState({ value: "", warnMsg: "" });
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(15);
    const [intervalId, setIntervalId] = useState(null);
    const { loading } = useSelector((state) => state.passReset);
    const [formFields, formDispatch] = useReducer(formReducer, formInit);
    const [warnMsg, warnMsgDispatch] = useReducer(formReducer, formInit);

    const emailInputHandler = (value) => {
        setEmail((prev) => { return { ...prev, value } });
    }

    useEffect(() => {
        if (timer === 0) {
            clearInterval(intervalId);
        }
    }, [timer]);

    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        setIntervalId(interval);
    };

    const otpInputHandler = (value) => {
        formDispatch({ field: 'otp', value });
    }

    const passInputHandler = (value) => {
        formDispatch({ field: 'password', value });
    }

    const confPassInputHandler = (value) => {
        formDispatch({ field: 'confirmPassword', value });
    }

    const sendOtpHandler = async () => {
        const isValid = await emailValidation(email.value);
        setEmail((prev) => { return { ...prev, warnMsg: isValid } });
        if (isValid !== '') {
            return;
        }
        await getForgotPassOtp(email.value, dispatch).then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
                if (response?.payload) {
                    setIsOtpSent(true);
                    startTimer();
                }
            }
            else {
                setIsOtpSent(false);
                if (response?.payload?.message) {
                    setEmail((prev) => { return { ...prev, warnMsg: response?.payload?.message } });
                }
            }
        }).catch((error) => {
            if (error?.message) {
                Alert.alert(error?.name, error?.message);
            }
        });
    };

    const checkIsValidData = (formWarnMsgs) => {
        let isValidData = true;
        for (key in formWarnMsgs) {
            if (formWarnMsgs[key] === '') {
                isValidData = true;
            }
            else {
                isValidData = false;
            }
        }
        return isValidData;
    }

    const resetPassHandler = async () => {
        const formValidation = {
            otp: formFields.otp.length === 6 ? '' : 'Otp Should contain 6 digits',
            password: await passwordValidation(formFields.password),
            confirmPassword: await confirmPasswordValidation(formFields.password, formFields.confirmPassword)
        }

        warnMsgDispatch({ field: 'all', value: formValidation });
        console.log(formFields);
        console.log(formValidation);

        if (!checkIsValidData(formValidation)) {
            return;
        }

        await forgotPassReset(email.value,formFields.otp,formFields.password, dispatch).then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
                if (response?.payload) {
                    Alert.alert(
                        "Success",
                        "Password has been updated successfully",
                        [
                            {
                                text:"Ok",
                                onPress:()=>navigation.replace('Login Screen')
                            }
                        ]
                        )
                }
            }
            else {
                if (response?.payload?.message) {
                    warnMsgDispatch({field:'otp',value:response.payload.message});
                }
            }
        }).catch((error) => {
            if (error?.message) {
                Alert.alert(error?.name, error?.message);
            }
        });

    }

    return (
        <View>
            <StatusBar />
            {!isOtpSent ?
                (
                    <View style={styles.formContainer}>
                        <TextInput autoCapitalize='none' warningMsg={email.warnMsg} onChangeText={emailInputHandler} placeholder='Enter your email id' />
                        <Button title="Send Otp" onPress={sendOtpHandler} containerStyles={styles.buttonContainer} textStyles={styles.buttonText} />
                    </View>
                ) :
                (
                    <ScrollView contentContainerStyle={styles.formContainer}>
                        <Text style={styles.otpSentText}>Otp has been sent to your email id: {email.value}</Text>
                        <TextInput keyboardType='number-pad' maxLength={6} warningMsg={warnMsg.otp} onChangeText={otpInputHandler} placeholder='Enter OTP' />
                        <PasswordInput onChangeText={passInputHandler} warningMsg={warnMsg.password} />
                        <PasswordInput onChangeText={confPassInputHandler} warningMsg={warnMsg.confirmPassword} />
                        {timer > 0 ?
                            (
                                <Text style={styles.timer}>Resend otp in {timer}</Text>
                            )
                            :
                            (
                                <Text onPress={sendOtpHandler} style={styles.resendOtp}>Resend otp </Text>
                            )
                        }

                        <Button title="Reset Password" onPress={resetPassHandler} containerStyles={styles.resetButtonContainer} textStyles={styles.buttonText} />

                    </ScrollView>
                )
            }
            {loading &&
                <Loading />
            }
        </View>
    )
}

export default ForgotPasswordScreen;