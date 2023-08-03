import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from './styles';

const Button = ({ title, icon = undefined, onPress = () => { }, containerStyles = {}, textStyles = {} }) => {
    const styles = buttonStyles();
    return (
        <TouchableOpacity onPress={onPress} style={[styles.touchableOpacity, containerStyles]}>
            <Text style={[styles.text, icon ? { margin: 2 } : {}, textStyles]}>{title}</Text>
            {icon &&
                icon
            }
        </TouchableOpacity>
    )
}

export default Button;