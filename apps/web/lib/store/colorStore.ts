import { create } from 'zustand';

interface Color {
    color: string;
}

interface UserState {
    color: Color | null;
    setColor: (color: Color) => void;
    clearColor: () => void;
}

export const useColorStore = create<UserState>((set) => ({
    color: null,
    setColor: (color) => set({ color }),
    clearColor: () => set({ color: null }),
}));
