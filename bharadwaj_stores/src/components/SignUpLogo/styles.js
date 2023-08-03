import { StyleSheet } from 'react-native';
import { useDimensions } from '../../hooks/useDimensions';
import { darkGray, violet, white } from '../../constants/colors';
import { useColorMode } from '../../hooks/useColorMode';
import normalize from '../../utils/normalize';

const signUpLogoStyles = () => {
    const { width, heightCalc, widthCalc } = useDimensions();
    const colorScheme = useColorMode();
    let trinagleBorderColor = colorScheme.isDarkMode ? darkGray : white;

    return StyleSheet.create({
        container: {
            backgroundColor: violet,
            width,
            height: heightCalc(23),
        },
        text: {
            color: 'white',
            fontSize: normalize(20),
            fontFamily: 'YsabeauInfant-BoldItalic',
            textAlign: 'center',
            width,
            marginTop: '11%'
        },
        triangleCover: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: width,
            borderRightWidth: 0,
            borderBottomWidth: heightCalc(6),
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: trinagleBorderColor,
        }
    })
}

export default signUpLogoStyles