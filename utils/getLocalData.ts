import * as SecureStore from "expo-secure-store"; // if you're using SecureStore
// or import AsyncStorage from "@react-native-async-storage/async-storage"; // if you're using AsyncStorage

export const getLocalData = async () => {
    try {
        console.log("Fetching local data...");
        const token = await SecureStore.getItemAsync("authToken"); // or AsyncStorage.getItem('authToken')
        if (token) {
            const user = await SecureStore.getItemAsync("user"); // or AsyncStorage.getItem('user')
            return { token, user: JSON.parse(user || '{}') };
        }
        return null;
    } catch (error) {
        console.error("Error retrieving local data", error);
        return null;
    }
};
export default getLocalData;