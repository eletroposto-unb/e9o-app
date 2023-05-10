import AsynStorage from '@react-native-async-storage/async-storage';

const storeUser = async (value: any) => {
  try {
    await AsynStorage.setItem('user', JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    const savedUser = await AsynStorage.getItem('user');
    const currentUser = JSON.parse(savedUser!);
    return currentUser;
  } catch (error) {
    console.log(error);
  }
};

const removeUser = async () => {
  try {
    await AsynStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export default {storeUser, getUser, removeUser};
