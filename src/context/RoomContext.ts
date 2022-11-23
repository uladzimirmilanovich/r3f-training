import { createContext } from "react";

export type TRoomContext = {
  pickedCard: number | null;
};

export const RoomContext = createContext<TRoomContext>({ pickedCard: null });
