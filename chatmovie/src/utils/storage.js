import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user');
        return (jsonValue !== null) ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e.message);
    }
}

export const storeData = async (user) => {
    try {
        const jsonUser = JSON.stringify(user);
        await AsyncStorage.setItem('@user', jsonUser);
    } catch (e) {
        console.log(e.message);
    }
}
