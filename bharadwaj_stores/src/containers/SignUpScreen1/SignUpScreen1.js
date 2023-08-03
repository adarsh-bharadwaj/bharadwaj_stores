import React, { useReducer, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, BackHandler, ActivityIndicator } from 'react-native';
import StatusBar from '../../components/StatusBar';
import CustomTextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SignUpLogo from '../../components/SignUpLogo/SignUpLogo';
import signup1Styles from './styles';
import { useDimensions } from '../../hooks/useDimensions';
import { firstNameValidation } from '../../utils/validation/firstName';
import { lastNameValidation } from '../../utils/validation/lastName';
import { mobileValidation } from '../../utils/validation/mobile';
import { emailValidation } from '../../utils/validation/email';
import { storeScreen1 } from '../../utils/registerformlStorage/Screen1';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmailPhone } from '../../services/checkEmailPhone';
import { resetDataState } from '../../redux/registerationSlice';
import Loading from '../../components/Loading/Loading';


const formInit = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
}

const formReducer = (state, action) => {
    switch (action.field) {
        case 'firstName':
            return { ...state, firstName: action.value }
        case 'lastName':
            return { ...state, lastName: action.value }
        case 'email':
            return { ...state, email: action.value }
        case 'mobile':
            return { ...state, mobile: action.value }
        case 'all':
            return action.value;

        default:
            return formInit;
    }
}

const SignUpScreen = ({ navigation }) => {
    const { height, width } = useDimensions()
    const styles = signup1Styles();
    const { isPotrait } = useDimensions();
    const [formFields, formDispatch] = useReducer(formReducer, formInit)
    const [warnMsg, warnMsgDispatch] = useReducer(formReducer, formInit);

    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.data);

    useEffect(() => {
        // if (error?.message?.includes('Validation')) {
        //     error.stack.map((item) => {
        //         warnMsgDispatch({ field: item.path, value: item.msg })
        //     })
        // }
        if (error) {
            Alert.alert(" Something went wrong\n Please try again after sometime.")
        }
    }, [error]);

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

    const firstNameHandler = (value) => {
        formDispatch({ field: 'firstName', value });
    }

    const lastNameHandler = (value) => {
        formDispatch({ field: 'lastName', value })
    }

    const emailHandler = (value) => {
        formDispatch({ field: 'email', value })
    }

    const mobileHandler = (value) => {
        formDispatch({ field: 'mobile', value })
    }

    const checkWarnMsg = (formValidation) => {
        let isValidData = false;

        for (key in formValidation) {
            if (formValidation[key].length === 0) {
                isValidData = true;
            }
            else {
                isValidData = false;
                break;
            }
        }

        return isValidData;
    }

    const saveAndMove = async (formValidation) => {
        const isValid = await checkWarnMsg(formValidation);
        if (isValid) {
            await storeScreen1(formFields);
            await navigation.replace('SignUp Screen 2');
            dispatch(resetDataState());
        }
    }

    const onNextHandler = async () => {
        const formValidation = {
            firstName: await firstNameValidation(formFields.firstName),
            lastName: await lastNameValidation(formFields.lastName),
            email: await emailValidation(formFields.email),
            mobile: await mobileValidation(formFields.mobile)
        }
        warnMsgDispatch({
            field: 'all', value: formValidation
        });


        if (!checkWarnMsg(formValidation)) {
            return;
        }

        await checkEmailPhone(formFields.email, formFields.mobile, dispatch)
            .then((response) => {
                response.payload.map(item => {
                    if (item.isExists) {
                        warnMsgDispatch({ field: item.field, value: item.message });
                        formValidation[item.field] = item.message;
                    }
                    else {
                        warnMsgDispatch({ field: item.field, value: '' });
                        formValidation[item.field] = '';
                    }
                })

            }).then(() => saveAndMove(formValidation)).catch((error)=>{console.log(error)});
    }
    return (
        <KeyboardAvoidingView behavior='height'>
            <StatusBar />
            {isPotrait &&
                <SignUpLogo />
            }
            <ScrollView
            showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer} style={styles.scrollView}
            >
                <CustomTextInput warningMsg={warnMsg.firstName} onChangeText={firstNameHandler} label="First Name" placeholder="first name" />
                <CustomTextInput warningMsg={warnMsg.lastName} onChangeText={lastNameHandler} label="Last Name" placeholder="last name" />
                <CustomTextInput autoCapitalize='none' warningMsg={warnMsg.email} onChangeText={emailHandler} label="Email" placeholder="email" />
                <CustomTextInput warningMsg={warnMsg.mobile} onChangeText={mobileHandler} label="Mobile" placeholder="mobile" />
                <View style={styles.buttonContainer}>
                    <Button containerStyles={styles.button} onPress={onNextHandler} title="Next" icon={<FontAwesome5 size={22} name="angle-right" style={styles.icon} color='white' />} />
                </View>
            </ScrollView>
            {loading &&
                <Loading />
            }
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen;