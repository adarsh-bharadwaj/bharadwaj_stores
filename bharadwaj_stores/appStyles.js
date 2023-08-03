import {useColorMode} from './src/hooks/useColorMode';
import {DefaultTheme} from '@react-navigation/native';
import {darkGray, violet, white} from './src/constants/colors';
import { StyleSheet } from 'react-native';
import { useDimensions } from './src/hooks/useDimensions';
import normalize from './src/utils/normalize';

const appStyles = ()=>{
    const {heightCalc,widthCalc} = useDimensions();
    //whether the device is in dark mode or not
    const colorScheme = useColorMode();

    //common theme for all Screens in Navigation Conatiner 
    let myTheme = null;
    //Assigning styles based on the mode of the device (Dark/Light)
    if (colorScheme.isDarkMode) {
        myTheme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                background: darkGray
            },
        };
    } else {
        myTheme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                background: white
            },
        };
    }

    const styles = StyleSheet.create({
        header:{
            backgroundColor:violet,
            height:heightCalc(8)
        },
        headerTitle:{
            color:white,
            fontSize:normalize(8),
            marginLeft:widthCalc(2)
        }
    })

    console.log(myTheme);
    console.log(DefaultTheme);

    return {myTheme,styles};
};

export default appStyles;