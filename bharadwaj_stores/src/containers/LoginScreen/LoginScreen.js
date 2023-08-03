import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, Image, Alert } from 'react-native';
import StatusBar from '../../components/StatusBar';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { heightCalc, widthCalc } from '../../constants/dimensions';
import Button from '../../components/Button/Button';
import { violet } from '../../constants/colors';
import Checkbox from '../../components/Checkbox/Checkbox';
import { loginStyles } from './styles';
import { loginUser } from '../../services/loginUser';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';

const LoginScreen = ({ navigation }) => {
    const styles = loginStyles();
    const [isChecked, setIsCheckbox] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.login);

    const [password, setPassword] = useState({ value: '', warnMsg: '' });
    const [username, setUsername] = useState({ value: '', warnMsg: '' });

    const usernameInputHandler = (value) => {
        setUsername((prev) => { return { ...prev, value } });
    };

    const passInputHandler = (value) => {
        setPassword((prev) => { return { ...prev, value } });
    };

    const onSubmitHandler = async () => {
        setUsername((prev) => { return { ...prev, warnMsg: '' } });
        setPassword((prev) => { return { ...prev, warnMsg: '' } });

        if (username.value.length === 0) {
            setUsername((prev) => { return { ...prev, warnMsg: 'Username cannot be empty' } });
            return;
        }

        if (password.value.length === 0) {
            setPassword((prev) => { return { ...prev, warnMsg: 'Password cannot be empty' } });
            return;
        }

        await loginUser(username.value, password.value, dispatch).then((response) => {
            console.log(response);
            if (response?.meta?.requestStatus === 'fulfilled') {
                if (response?.payload) {

                }
            }
            else {
                if (response?.payload?.message) {
                    if (response?.payload?.name === 'password')
                        setPassword((prev) => { return { ...prev, warnMsg: response.payload.message } });

                    if (response?.payload?.name === 'email')
                        setUsername((prev) => { return { ...prev, warnMsg: response.payload.message } })
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
        });
    }

    const checkboxHandler = (newValue) => {
        setIsCheckbox(newValue);
    };
    console.log(password);
    return (
        <KeyboardAvoidingView behavior='height' style={styles.mainContainer}>
            <StatusBar />
            <View style={styles.logoContainer}>
                <Image style={styles.logoImage} fadeDuration={1000 * 2} source={require('../../assets/images/Bharadwaj-Stores-icon.jpg')} />
                <View style={styles.maskTriangle} />
            </View>

            <View style={styles.formContainer}>

                <TextInput autoCapitalize='none' warningMsg={username.warnMsg} onChangeText={usernameInputHandler} placeholder='Username/Email' />
                <PasswordInput warningMsg={password.warnMsg} onChangeText={passInputHandler} />

                <View style={styles.checkBoxContainer}>
                    <Checkbox checked={isChecked} onValueChange={checkboxHandler} label='Remember Me' />
                    <Text onPress={() => navigation.navigate('Forgot Password Screen')} style={styles.forgotPassText}>Forgot Password?</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button onPress={onSubmitHandler} containerStyles={styles.button} textStyles={styles.buttonText} title="Sign In" />
                </View>

            </View>
            {loading &&
                <Loading />
            }
        </KeyboardAvoidingView>
    )
};

export default LoginScreen;