import { create } from 'zustand';

const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),

  notifications: [],
  setNotifications: (notifications) => set({ notifications }),

  // Add more global state and actions here as needed
}));

export default useAppStore;
