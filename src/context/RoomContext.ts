import { createContext } from 'react';
import { TCard } from '../types/Card';

export type TRoomContext = {
  pickedCard?: TCard;
};

export const RoomContext = createContext<TRoomContext>({ pickedCard: null });
