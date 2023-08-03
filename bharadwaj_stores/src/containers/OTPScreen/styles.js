import { StyleSheet } from 'react-native';
import { useColorMode } from '../../hooks/useColorMode';
import { useDimensions } from '../../hooks/useDimensions';
import { black, gray, red, white } from '../../constants/colors';
import normalize from '../../utils/normalize';

const otpScreenStyles = () => {
    const { isDarkMode } = useColorMode();
    let textColor = isDarkMode ? gray : black;

    const { widthCalc} = useDimensions();

    let inputTextColor, inputBorderColor;
    if (isDarkMode) {
        inputTextColor = white;
        inputBorderColor = gray;
    }
    else {
        inputBorderColor = black;
        inputTextColor = black;
    }
    return StyleSheet.create({
        container: {
            paddingTop:'2%',
        },
        inputContainer: {
            display: 'flex',
            alignSelf:'center',
            alignItems: 'center',
            height:'100%',
            width:'80%',
        },
        input: {
            width: widthCalc(80),
            height: 50,
            paddingLeft: '4%',
            fontSize: normalize(5.6),
            color: inputTextColor,
            borderColor: inputBorderColor,
            borderRadius: 0,
            borderWidth: 0,
            borderBottomWidth: 1,
            alignSelf: 'center',
        },
        text: {
            fontSize: normalize(7),
            color: textColor,
            marginTop: '2%',
            fontWeight: 'bold',
        },
        buttonContainer: { marginTop: 10 },
        button: {
            width: widthCalc(30),
            height: '23%'
        },
        buttonText: {
            fontSize: normalize(7)
        },
        warnMsg: { alignSelf: 'flex-start', color: red, fontSize: normalize(4.8), marginTop: 2, marginLeft: 3 },
        resendText: {
            fontSize: normalize(6),
            alignSelf: 'flex-start',
            paddingLeft: '1%',
            color: textColor
        },
        resendOtp: {
            fontSize: normalize(6),
            alignSelf: 'flex-start',
            paddingLeft: '1%',
            color: textColor,
            textDecorationLine:'underline'
        }
    })
}

export default otpScreenStyles;