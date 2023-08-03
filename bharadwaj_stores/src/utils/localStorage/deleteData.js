const { Alert } = require("react-native");
import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteAsyncData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        Alert.alert(e);
    }
};