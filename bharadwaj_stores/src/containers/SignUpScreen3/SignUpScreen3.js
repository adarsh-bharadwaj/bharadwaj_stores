import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import StatusBar from '../../components/StatusBar';
import Button from '../../components/Button/Button';
import SignUpLogo from '../../components/SignUpLogo/SignUpLogo';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useDimensions } from '../../hooks/useDimensions';
import signup3Styles from './styles';
import { passwordValidation } from '../../utils/validation/password';
import { confirmPasswordValidation } from '../../utils/validation/confirmPassword';
import { getScreen3, storeScreen3 } from '../../utils/registerformlStorage/Screen3';
import { getScreen1 } from '../../utils/registerformlStorage/Screen1';
import { getScreen2 } from '../../utils/registerformlStorage/Screen2';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { verifyEmail } from '../../services/verifyEmail';

const SignUpScreen = ({ navigation }) => {
    const { isPotrait } = useDimensions();
    const [password, setPassword] = useState({ data: "", warnMsg: "" });
    const [confirmPassword, setConfirmPassword] = useState({ data: "", warnMsg: "" });
    const { loading, data, error } = useSelector(state => state.data);
    const dispatch = useDispatch();

    const styles = signup3Styles()

    const passwordHandler = (value) => {
        setPassword((prev) => { return { ...prev, data: value } });
    }

    const confirmPasswordHandler = (value) => {
        setConfirmPassword((prev) => { return { ...prev, data: value } });
    }

    const onSubmitHandler = async () => {
        const isValidPassword = await passwordValidation(password.data);
        setPassword((prev) => { return { ...prev, warnMsg: isValidPassword } });
        const isValidConfirmPassword = await confirmPasswordValidation(password.data, confirmPassword.data);
        setConfirmPassword((prev) => { return { ...prev, warnMsg: isValidConfirmPassword } });

        if (isValidPassword.length === 0 && isValidConfirmPassword.length === 0) {
            await storeScreen3({ password: password.data });
            const data = { ...await getScreen1() };

            await verifyEmail(data["email"], dispatch).then((response)=>{
                console.log(response);
                console.log("response",response.meta.requestStatus);
                if(response.meta.requestStatus==='fulfilled')
                {
                    navigation.replace('OTP Screen');
                }
                else
                {
                    throw new Error(error);
                }
            }).catch(error=>{
                console.log("error",error);
            })

        }

    }
    console.log(password);
    return (
        <KeyboardAvoidingView style={styles.container} behavior='height' >
            <StatusBar />
            <ScrollView style={styles.scroll}>
                {isPotrait &&
                    <SignUpLogo />
                }
                <View
                    style={styles.formContainer}
                >

                    <View style={styles.formFieldsContainer}>
                        <PasswordInput warningMsg={password.warnMsg} onChangeText={passwordHandler} label='Password' />
                        <PasswordInput warningMsg={confirmPassword.warnMsg} onChangeText={confirmPasswordHandler} placeholder='Confirm Password' label='Confirm Password' />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button textStyles={styles.buttonText} containerStyles={styles.button} onPress={onSubmitHandler} title="Register" />
                    </View>
                </View>
            </ScrollView>
            {loading &&
                <Loading />
            }
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen;