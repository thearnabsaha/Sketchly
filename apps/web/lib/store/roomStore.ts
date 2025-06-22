import { create } from 'zustand';

interface Room {
  RoomId: string;
}

interface UserState {
  room: Room | null;
  setRoom: (room: Room) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<UserState>((set) => ({
  room: null,
  setRoom: (room) => set({ room }),
  clearRoom: () => set({ room: null }),
}));
