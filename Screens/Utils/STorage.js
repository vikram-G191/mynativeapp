import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserId = async (userId) => {
    try {
        await AsyncStorage.setItem('userId', userId);
    } catch (error) {
        console.error('Error storing user ID:', error);
    }
};

export const getUserId = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        return userId;
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
};

export const clearUserId = async () => {
    try {
        await AsyncStorage.removeItem('userId');
        console.log('User ID cleared successfully.');
    } catch (error) {
        console.error('Error clearing user ID:', error);
    }
};
