import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSignupStore = create((set) => ({
  phoneNumber: '',
  username: '',
  email: '',
  password: '',

  user: null,
  token: null,
  isVerified: false,

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  setUserData: (user) => set({
    user,
    isVerified: user?.isVerified || false,
  }),

// useSignupStore.js
login: async (credentials) => {
    try {
      const response = await fetch('https://femopay-startup.onrender.com/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { success: false, message: data?.message || 'Login failed' };
      }
  
      set({
        user: data.user,
        token: data.accessToken,
        isVerified: data.user?.isVerified || false,
      });
  
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  },
  
  

  logout: async () => {
    await AsyncStorage.clear();
    set({
      user: null,
      token: null,
      isVerified: false,
    });
  },

  clearSignupData: () => set({
    phoneNumber: '',
    username: '',
    email: '',
    password: '',
    user: null,
    token: null,
    isVerified: false,
  }),
}));

export default useSignupStore;
