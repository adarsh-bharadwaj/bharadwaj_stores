import { StyleSheet } from 'react-native';
import { useColorMode } from '../../hooks/useColorMode';
import { useDimensions } from '../../hooks/useDimensions';
import normalize from '../../utils/normalize';
import { black, lightGray,white,gray } from '../../constants/colors';
import { red } from '../../constants/colors';

const passInputStyles = () => {
    const { widthCalc,heightCalc } = useDimensions();
    const { isDarkMode } = useColorMode();
    let labelColor, inputTextColor, inputBorderColor;
    if (isDarkMode) {
        labelColor = lightGray;
        inputTextColor = white;
        inputBorderColor = gray;
    }
    else {
        inputBorderColor = black;
        labelColor = black;
        inputTextColor = black;
    }

    return StyleSheet.create({
        container: { marginTop: 14 },
        label: {
            fontSize: normalize(5.6),
            fontWeight: 'bold',
            color: labelColor
        },
        inputContainer: {
            borderWidth: 1,
            width: widthCalc(80),
            height: 50,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: '4%',
            borderColor: inputBorderColor
        },
        input: {
            width: widthCalc(70),
            height: 50,
            paddingLeft: '4%',
            fontSize: normalize(5.6),
            borderRadius: 15,
            color: inputTextColor,
        },
        iconContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '4%',
            paddingLeft: '1%'
        },
        iconColor: labelColor,
        warnMsg:{ color: red, fontSize: normalize(4.8),marginTop:2,marginLeft:3 }
    })
}

export default passInputStyles;