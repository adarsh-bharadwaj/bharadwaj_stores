import React from 'react';
import {View,Text} from 'react-native';
import  signUpLogoStyles  from './styles';

const SignUpLogo = () => {
    const styles = signUpLogoStyles();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <View style={styles.triangleCover} />
        </View>
    )
}

export default SignUpLogo;