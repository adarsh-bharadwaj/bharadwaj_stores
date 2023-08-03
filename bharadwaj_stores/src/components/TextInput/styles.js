import { StyleSheet } from 'react-native';
import { useDimensions } from '../../hooks/useDimensions';
import normalize from '../../utils/normalize';
import { useColorMode } from '../../hooks/useColorMode';
import { black, gray, lightGray,red,white } from '../../constants/colors';

const textInputStyles = () => {
    const {widthCalc,heightCalc} = useDimensions();
    const colorScheme = useColorMode();

    let labelColor,inputTextColor,inputBorderColor;
    if(colorScheme.isDarkMode)
    {
        labelColor = lightGray;
        inputTextColor = white;
        inputBorderColor = gray;
    }
    else
    {
        inputBorderColor = black;
        labelColor = black;
        inputTextColor = black;
    }
    
    return StyleSheet.create({
        container: { marginTop: 14 },
        label: {
            fontSize: normalize(5.6),
            fontWeight: 'bold',
            color: labelColor,
        },
        input: {
            width: widthCalc(80),
            borderWidth: 1,
            height: 50,
            borderRadius: 15,
            paddingLeft: '4%',
            fontSize: normalize(5.6),
            color: inputTextColor,
            borderColor:inputBorderColor,
            marginTop: '4%'
        },
        warnMsg:{ color: red, fontSize: normalize(4.8),marginTop:2,marginLeft:3 }
    })
}

export default textInputStyles;