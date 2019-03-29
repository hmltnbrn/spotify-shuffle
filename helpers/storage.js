import AsyncStorage from '@react-native-community/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
    return false;
  }
  return true;
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
};
