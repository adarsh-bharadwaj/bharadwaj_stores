import React, { useReducer,useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView,Alert,BackHandler } from 'react-native';
import StatusBar from '../../components/StatusBar';
import CustomTextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SignUpLogo from '../../components/SignUpLogo/SignUpLogo';
import signup2Styles from './styles';
import { useDimensions } from '../../hooks/useDimensions';
import { line1Validation } from '../../utils/validation/line1';
import { line2Validation } from '../../utils/validation/line2';
import { cityValidation } from '../../utils/validation/city';
import { stateValidation } from '../../utils/validation/State';
import { pincodeValidation } from '../../utils/validation/pincode';
import { storeScreen2 } from '../../utils/registerformlStorage/Screen2';


const formInit = {
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
}

const formReducer = (state, action) => {
    console.log(action)
    switch (action.field) {
        case 'line1':
            return { ...state, line1: action.value }
        case 'line2':
            return { ...state, line2: action.value }
        case 'city':
            return { ...state, city: action.value }
        case 'state':
            return { ...state, state: action.value }
        case 'pincode':
            return { ...state, pincode: action.value }
        case 'all':
            return action.value;

        default:
            return formInit;
    }
}



const SignUpScreen2 = ({ navigation }) => {
    const { isPotrait } = useDimensions();
    const [formFields, formDispatch] = useReducer(formReducer, formInit)
    const [warnMsg, warnMsgDispatch] = useReducer(formReducer, formInit);
    const styles = signup2Styles();

    // Set up the back button event listener when the component mounts
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Clean up the back button event listener when the component unmounts
        return () => backHandler.remove();
    }, []);

    const handleBackPress = async () => {
        Alert.alert("Warning", "Your data will be discarded", [
            {
                text: "Cancel",
            },
            {
                text: "Ok",
                onPress: () => navigation.goBack()
            }
        ], { cancelable: true });

        return true;
    }

    const line1Handler = (value) => {
        formDispatch({ field: 'line1', value });
    }

    const line2Handler = (value) => {
        formDispatch({ field: 'line2', value })
    }

    const cityHandler = (value) => {
        formDispatch({ field: 'city', value })
    }

    const stateHandler = (value) => {
        formDispatch({ field: 'state', value })
    }

    const pincodeHandler = (value) => {
        formDispatch({ field: 'pincode', value })
    }

    const onNextHandler = async () => {
        const formValidation = {
            line1: await line1Validation(formFields.line1),
            line2: await line2Validation(formFields.line2),
            city: await cityValidation(formFields.city),
            state: await stateValidation(formFields.state),
            pincode: await pincodeValidation(formFields.pincode)

        }
        warnMsgDispatch({
            field: 'all', value: formValidation
        });

        let isValidData = false;

        for (key in formValidation) {
            if (formValidation[key].length === 0) {
                isValidData = true;
            }
            else {
                isValidData = false;
                return;
            }
        }

        if (isValidData) {
            storeScreen2(formFields);
            navigation.replace('SignUp Screen 3');
        }

    }

    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={-40} behavior='position' >
            <StatusBar />
            <ScrollView style={styles.scroll}>
                {isPotrait &&
                    <SignUpLogo />
                }
                <View
                    style={styles.formContainer}
                >

                    <View style={styles.formFieldsContainer}>
                        <Text style={styles.text}>Address</Text>
                        <CustomTextInput
                            warningMsg={warnMsg.line1}
                            onChangeText={line1Handler}
                            labelProps={{
                                style: styles.label
                            }} label="Line 1" placeholder="Building No/Flat No..." />
                        <CustomTextInput
                            warningMsg={warnMsg.line2}
                            onChangeText={line2Handler}
                            labelProps={{
                                style: styles.label
                            }} label="Line 2" placeholder="Area/Street...." />
                        <CustomTextInput
                            warningMsg={warnMsg.city}
                            onChangeText={cityHandler}
                            labelProps={{
                                style: styles.label
                            }} label="City" placeholder="City" />
                        <CustomTextInput
                            warningMsg={warnMsg.state}
                            onChangeText={stateHandler}
                            labelProps={{
                                style: styles.label
                            }} label="State" placeholder="State" />
                        <CustomTextInput
                            warningMsg={warnMsg.pincode}
                            onChangeText={pincodeHandler}
                            keyboardType='number-pad'
                            maxLength={6}
                            labelProps={{
                                style: styles.label
                            }} label="Pincode" placeholder="Pincode" />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button containerStyles={styles.button} onPress={onNextHandler} title="Next" icon={<FontAwesome5 size={22} name="angle-right" style={styles.icon} color='white' />} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen2;