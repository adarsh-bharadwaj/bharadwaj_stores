import { StyleSheet } from "react-native";
import { useColorMode } from "../../hooks/useColorMode";
import { useDimensions } from "../../hooks/useDimensions";
import { darkGray, lightGray, violet, white } from "../../constants/colors";
import normalize from "../../utils/normalize";

export const loginStyles = () => {
    const colorScheme = useColorMode();
    const { widthCalc, heightCalc, width, height } = useDimensions();
    let textColor = colorScheme.isDarkMode ? lightGray : violet;
    let trinagleBorderColor = colorScheme.isDarkMode ? darkGray : white;

    return StyleSheet.create({
        mainContainer: {
            width,
            height,
            zIndex: 2000
        },
        logoContainer: {
            width,
            display: 'flex',
            flexDirection: 'column'
        },
        logoImage: {
            width,
            height: heightCalc(30),
        },
        maskTriangle: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: width,
            borderRightWidth: 0,
            borderBottomWidth: heightCalc(8),
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: trinagleBorderColor,
        },
        formContainer: {
            width,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkBoxContainer: {
            width: widthCalc(80),
            marginTop: '2%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        forgotPassText: {
            color: textColor,
            fontSize: normalize(6),
            textAlign: 'right',
            fontWeight: '600'
        },
        buttonContainer: { marginTop: '6%' },
        button:{
            width:widthCalc(30),
            height:'28%'
        },
        buttonText:{
            textAlign:'center',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
        }
    })
}