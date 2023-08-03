import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import StatusBar from '../../components/StatusBar';
import TextInput from '../../components/TextInput/TextInput';
import otpScreenStyles from './styles';
import Button from '../../components/Button/Button';
import { getScreen1 } from '../../utils/registerformlStorage/Screen1';
import { verifyEmail } from '../../services/verifyEmail';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { verifyRegOtp } from '../../services/verifyRegOtp';
import { registerUser } from '../../services/registerUser';

const OTPScreen = ({ navigation }) => {
    const styles = otpScreenStyles();
    const [email, setEmail] = useState();
    const [otpEntered, setOtpEntered] = useState('');
    const [warnMsg, setWarnMsg] = useState('');
    const [timer, setTimer] = useState(15);
    const [intervalId, setIntervalId] = useState(null);
    const { loading, data, error } = useSelector(state => state.data);
    const dispatch = useDispatch();


    useEffect(() => {
        const getEmail = async () => {
            let screen1Data = { ...await getScreen1() };
            let maskedEmail = '';
            for (i = 0; i < screen1Data["email"].length; i++) {
                if (i % 4) {
                    if (screen1Data["email"][i] !== '@' && screen1Data["email"][i] !== '.') {
                        maskedEmail += 'x';
                        continue;
                    }
                }
                console.log(screen1Data["email"][i])
                maskedEmail += screen1Data["email"][i];
            }
            setEmail(maskedEmail);
        }
        getEmail();
        startTimer();

        return () => clearInterval(intervalId);
    }, []);

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


    const inputHandler = (value) => {
        setOtpEntered(value);
    }

    const resendOtp = async () => {
        const data = { ...await getScreen1() };

        await verifyEmail(data["email"], dispatch).then((response) => {
            console.log(response);
            console.log("response", response.meta.requestStatus);
            if (response.meta.requestStatus === 'fulfilled') {
                setTimer(15);
                startTimer();
            }
            else {
                console.log(error);
            }
        }).catch(error => {
            console.log("error", error);
        })
    }

    const onSubmitHandler = async () => {
        if (otpEntered.length !== 6) {
            setWarnMsg("Otp Should contain 6 digits");
            return;
        }
        const screen1Data = { ...await getScreen1() };
        await verifyRegOtp(screen1Data["email"], otpEntered, dispatch).then(async (response) => {
            console.log(response);
            console.log("response", response.meta.requestStatus);
            if (response.meta.requestStatus === 'fulfilled') {
                await registerUser(dispatch).then((response) => {
                    console.log(response);
                    if (response.meta.requestStatus === 'fulfilled') {
                        if (response?.payload?.message) {
                            Alert.alert(
                                "Success",
                                response.payload.message,
                                [{
                                    text: "Ok",
                                    onPress: () => navigation.replace("Login Screen")
                                }]
                            );
                        }
                    }
                    else {
                        if (response?.error?.name) {
                            let error = new Error();
                            error.name = response.error.name;
                            error.message = response.error.message;
                            throw error;
                        }
                    }
                });
            }
            else {
                if (response?.payload?.message) {
                    setWarnMsg(response.payload.message)
                }
                if (response?.error?.name) {
                    let error = new Error();
                    error.name = response.error.name;
                    error.message = response.error.message;
                    throw error;
                }
            }
        }).catch((error) => {
            if (error?.message && error?.name) {
                Alert.alert(error?.name, error?.message);
            }
            console.log(error.message);
        })
    }

    console.log(email);
    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.inputContainer}>
                <Text numberOfLines={2} style={styles.text}>Otp has been sent to your email-id {email}</Text>
                <TextInput placeholder='Enter your Otp'
                    style={styles.input}
                    maxLength={6}
                    keyboardType='number-pad'
                    onChangeText={inputHandler}
                />
                <Text style={styles.warnMsg}>{warnMsg}</Text>
                {timer !== 0 ?
                    (<Text style={styles.resendText}>resend otp in <Text>{timer}</Text></Text>)
                    :
                    (<Text onPress={resendOtp} style={styles.resendOtp}>resend Otp</Text>)
                }
                <View style={styles.buttonContainer}>
                    <Button textStyles={styles.buttonText} onPress={onSubmitHandler} containerStyles={styles.button} title="Verify" />
                </View>
            </View>
            {loading &&
                <Loading />
            }
        </View>
    )
}

export default OTPScreen;