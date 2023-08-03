import { StyleSheet } from "react-native";
import { useColorMode } from "../../hooks/useColorMode";
import { useDimensions } from "../../hooks/useDimensions";
import normalize from "../../utils/normalize";
import { black, lightGray } from "../../constants/colors";

const signup3Styles = () => {
    const { heightCalc, height, widthCalc } = useDimensions();

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
        formFieldsContainer: { marginTop: '2%' },
        buttonContainer: { alignSelf: 'center', marginTop: '6%' },
        button: {
            width: widthCalc(40),
            height:'29%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        },
        buttonText:{
            textAlign:'center',
            marginRight:0
        }
    });
};

export default signup3Styles;