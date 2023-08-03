import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { widthCalc } from '../../constants/dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import passInputStyles from './styles';

interface Props extends TextInputProps {
    label: string;
    warningMsg: string
}

const PasswordInput: React.FC<Props> = ({ label = '', warningMsg = '', placeholder = 'Password', ...rest }) => {
    const styles = passInputStyles();
    console.log(warningMsg);
    const [passEyeVisible, setPassEyeVisible] = useState(true);
    return (
        <View style={styles.container}>
            {label.length > 0 &&
                <Text style={styles.label}>{label}</Text>
            }
            <View style={styles.inputContainer}>
                <TextInput
                    {...rest}
                    secureTextEntry={passEyeVisible ? true : false}
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor='#b3b3b3'
                />
                <TouchableOpacity onPress={() => setPassEyeVisible((prev) => !prev)} style={styles.iconContainer}>
                    {passEyeVisible ?
                        <Ionicons name="eye" color={styles.iconColor} size={20} />
                        :
                        <Ionicons name="eye-off" color={styles.iconColor} size={20} />
                    }
                </TouchableOpacity>
            </View>
            <Text style={[styles.warnMsg, warningMsg.length > 0 ? { opacity: 1 } : { opacity: 0 }]}>{warningMsg}</Text>
        </View>
    )
}

export default PasswordInput;