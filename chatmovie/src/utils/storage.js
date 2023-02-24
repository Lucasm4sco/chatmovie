import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

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
        await SecureStore.setItemAsync('token', token);
    } catch (e) {
        console.log(e.message);
    }
}

export const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        return token;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

export const removeDataStorage = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null)
            await AsyncStorage.removeItem('user');

        await SecureStore.deleteItemAsync('token');
    } catch (e) {
        console.log(e.message);
    }
}