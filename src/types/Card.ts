export enum CardSuit {
  Clubs = 0,
  Diamonds = 1,
  Hearts = 2,
  Spades = 3,
}

export type TCardSymbol =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export type TCardSuit = {
  id: CardSuit;
  visualUrl: string;
  label?: string;
  color: string;
};

export type TCard = {
  key: string;
  isShown: boolean;
  suit?: TCardSuit;
  symbol?: TCardSymbol;
} | null;
