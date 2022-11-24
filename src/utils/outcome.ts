import { cardsConfig } from '../config';
import { TCard, TCardSymbol } from '../types/Card';

export const getRandomOutcome = (): TCard => {
  const randomSuitIndex = Math.floor(Math.random() * cardsConfig.suits.length);
  const randomSymbolIndex = Math.floor(
    Math.random() * cardsConfig.symbols.length,
  );

  return {
    isShown: true,
    key: [randomSuitIndex, randomSymbolIndex].toString(),
    suit: cardsConfig.suits[randomSuitIndex],
    symbol: cardsConfig.symbols[randomSymbolIndex] as TCardSymbol,
  };
};
