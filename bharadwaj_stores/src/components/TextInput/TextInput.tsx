import React, { FC } from 'react';
import { View, Text, TextInput as Input, TextInputProps, TextProps } from 'react-native';
import textInputStyles from './styles';

interface Props extends TextInputProps {
    label: string;
    labelProps: TextProps,
    warningMsg: string
}

const TextInput: FC<Props> = ({ label = '', warningMsg = '', labelProps = {},style={}, ...rest }) => {
    const styles = textInputStyles();
    return (
        <View style={styles.container}>
            {label.length > 0
                &&
                <Text style={styles.label}
                    {...labelProps}
                >{label}</Text>
            }
            <Input
                {...rest}
                style={[styles.input,style]}
                placeholderTextColor='#b3b3b3'
            />
                <Text style={[styles.warnMsg,{opacity:warningMsg.length>0 ? 1 :0}]}>{warningMsg}</Text>
        </View>
    )
}

export default TextInput;