import React from 'react';
import {View,Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { black, lightGray, violet, white } from '../../constants/colors';
import { checkboxStyles } from './styles';
import { useColorMode } from '../../hooks/useColorMode';

const Checkbox = ({ label = '', checked = false, onValueChange = (newValue) => { } }) => {
    const styles = checkboxStyles();
    const {isDarkMode} = useColorMode();
    return (
        <View style={styles.container}>
            <CheckBox
                onCheckColor='white'
                onAnimationType='stroke'
                offAnimationType='stroke'
                animationDuration={0.5}
                tintColors={{ true: isDarkMode ? lightGray: violet, false: isDarkMode ? lightGray : black }}
                value={checked}
                onValueChange={onValueChange}
            />
            <Text style={styles.text}>
                {label}
            </Text>
        </View>
    )
}

export default Checkbox;