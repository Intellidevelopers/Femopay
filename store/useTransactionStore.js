import { create } from 'zustand';

const useTransactionStore = create((set) => ({
  transactions: [],
  selectedTransaction: null,
  setTransactions: (data) => set({ transactions: data }),
  selectTransaction: (transaction) => set({ selectedTransaction: transaction }),
}));

export default useTransactionStore;
