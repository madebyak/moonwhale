import { create } from 'zustand';

interface NavStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const useNavStore = create<NavStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));

export default useNavStore; 