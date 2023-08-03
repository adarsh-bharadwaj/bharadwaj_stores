import React from 'react';
import {View,ActivityIndicator} from 'react-native';
import { loadingStyles } from './styles';
import normalize from '../../utils/normalize';

const Loading = () => {
    const styles = loadingStyles();
    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator color={styles.color} size='100%' />
            </View>
        </View>
    )
}

export default Loading;