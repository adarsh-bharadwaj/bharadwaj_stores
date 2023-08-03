const { Alert } = require("react-native");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAsyncData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        Alert.alert(e);
    }
};