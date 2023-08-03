import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      Alert.alert(e);
    }
  };