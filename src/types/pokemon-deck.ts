import { PokemonCard } from './pokemon-api';

export interface Deck {
  name: string;
  cards: PokemonCard[];
}
