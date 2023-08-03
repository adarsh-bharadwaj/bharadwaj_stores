import { StyleSheet } from "react-native";
import { useColorMode } from "../../hooks/useColorMode";
import { useDimensions } from "../../hooks/useDimensions";
import normalize from "../../utils/normalize";
import { black, lightGray } from "../../constants/colors";

const signup2Styles = () => {
    const {  height, widthCalc } = useDimensions();
    const colorScheme = useColorMode();
    let labelColor = colorScheme.isDarkMode ? lightGray : black;

    return StyleSheet.create({
        container: { height },
        scroll: { marginBottom: '1%' },
        formContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            alignSelf: 'center',
            width: widthCalc(80),
            paddingBottom:'6%'
        },
        formFieldsContainer: { marginTop: '15%' },
        text: {
            fontSize: normalize(7),
            fontWeight: 'bold',
            color: labelColor
        },
        label: {
            fontStyle: 'italic',
            fontSize: normalize(5.6),
            color: labelColor,
            fontWeight: 'bold'
        },
        buttonContainer: {
            alignSelf: 'center',
            marginTop: '6%'
        },
        button:{
            width:widthCalc(40),
        },
        icon: { paddingTop: 4 }
    });
};

export default signup2Styles;