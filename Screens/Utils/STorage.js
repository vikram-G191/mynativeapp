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
        // return "hello"
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
export const storeName = async (name) => {
    try {
        await AsyncStorage.setItem("userName", name)
    }
    catch (err) {
        console.error("Error storing user name")
    }
}
export const getName = async () => {
    try {
        const name = await AsyncStorage.getItem("userName")
        return name
    }
    catch (err) {
        console.error("Error getting username");

    }
}

export const storeEmail = async (email) => {
    try {
        await AsyncStorage.setItem("userEmail", email)
    }
    catch (err) {
        console.error("Error storing email id")
    }
}
export const getEmail = async () => {
    try {
        const email = await AsyncStorage.getItem("userEmail")
        return email
    }
    catch (err) {
        console.error("Error Getting email id")
    }
}
export const storePhone = async (phoneNumber) => {
    try {
        await AsyncStorage.setItem("userPhone", phoneNumber);
    } catch (err) {
        console.error("Error storing phone number:", err);
    }
}

export const getPhone = async () => {
    try {
        const phoneNumber = await AsyncStorage.getItem("userPhone");
        return phoneNumber;
    } catch (err) {
        console.error("Error getting phone number:", err);
    }
}

export const storeGender = async (gender) => {
    try {
        await AsyncStorage.setItem("gender", gender)
    }
    catch (err) {
        console.error("Error storing gender")
    }
}

export const getGender = async () => {
    try {
        const gender = await AsyncStorage.getItem("gender")
        return gender
    }
    catch (err) {
        console.error("Error Getting email id")
    }
}

export const storeState = async (state) => {
    try {
        await AsyncStorage.setItem("state", state)
    }
    catch (err) {
        console.error("Error storing state")
    }
}

export const getState = async () => {
    try {
        const state = await AsyncStorage.getItem("state")
        return state
    }
    catch (err) {
        console.error("Error Getting state")
    }
}

export const storeDOB = async (dob) => {
    try {
        await AsyncStorage.setItem("dob", dob)
    }
    catch (err) {
        console.error("Error storing DOB")
    }
}

export const getDOB = async () => {
    try {
        const dob = await AsyncStorage.getItem("dob")
        return dob
    }
    catch (err) {
        console.error("Error Getting DOB")
    }
}

export const storeOccupation = async (occupation) => {
    try {
        await AsyncStorage.setItem("occupation", occupation)
    }
    catch (err) {
        console.error("Error storing occupation")
    }
}

export const getOccupation = async () => {
    try {
        const occupation = await AsyncStorage.getItem("occupation")
        return occupation
    }
    catch (err) {
        console.error("Error Getting occupation")
    }
}

export const storeTokenId = async (tokenId) => {
    try {
      await AsyncStorage.setItem("tokenId",tokenId)
    }
    catch (err) {
        console.error("Error storing tokenId")
    }
}
export const getTokenId = async () =>{
    try{
        const tokenId = await AsyncStorage.getItem("tokenId")
        return tokenId
    }
    catch(err) {
        console.error("Error getting Token Id")
    }
}

// Save offers
export const storeOffersList = async (offer) => {
  try {
    const jsonValue = JSON.stringify(offer); // ✅ convert object to string
    await AsyncStorage.setItem("offer", jsonValue);
  } catch (err) {
    console.error("Error storing Offers", err);
  }
};

// Get offers
export const getOffersList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("offer");
    return jsonValue != null ? JSON.parse(jsonValue) : null; // ✅ parse it back to object
  } catch (err) {
    console.error("Error getting Offers", err);
  }
};

export const storeNotificationToken = async(tokenId)=>{
     console.log(tokenId,"asydjfh toeken");
    
    try{
        const jsonValue = JSON.stringify(tokenId)
        await AsyncStorage.setItem("Nofifytoken",jsonValue)
    }
    catch(err){
        console.error(err);
        
    }
}

export const getNotificationToken = async()=>{
    try{
        const jsonValue = await AsyncStorage.setItem("Nofifytoken")
        return jsonValue != null ? JSON.parse(jsonValue):null
    }
    catch(err){
        console.error(err);
        
    }
}
export const clearAllAsync = async () => {
    try {
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userPhone');
        await AsyncStorage.removeItem('gender');
        await AsyncStorage.removeItem('occupation');
    }
    catch (error) {
        console.error('Error clearing user ID:', error);
    }
}
