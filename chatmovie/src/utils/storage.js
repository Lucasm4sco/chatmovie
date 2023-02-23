import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return (jsonValue !== null) ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e.message);
    }
}

export const storeData = async (key, data) => {
    try {
        const jsonUser = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonUser);
    } catch (e) {
        console.log(e.message);
    }
}

export const storeToken = async (token) => {
    try {
        await Keychain.setGenericPassword(token, 'token');
    } catch (e) {
        console.log(e.message);
    }
}

export const getToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        return credentials ? credentials.token : null;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}