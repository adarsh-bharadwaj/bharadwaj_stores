import { StyleSheet } from "react-native";
import { lightGray, violet } from "../../constants/colors";
import { useColorMode } from "../../hooks/useColorMode";
import normalize from "../../utils/normalize";

export const checkboxStyles = () => {
    const {isDarkMode} = useColorMode();
    let textColor = isDarkMode?lightGray : violet;
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: normalize(6),
            fontWeight: '600',
            color: textColor,
            textAlign: 'center',
        }
    })
}