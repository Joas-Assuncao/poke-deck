export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Abilities {
  name: string;
  text: string;
  type: string;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface SetInformation {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
    expanded: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface TCGPlayerPrices {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

export interface TCGPlayer {
  url: string;
  updatedAt: string;
  prices: {
    holofoil: TCGPlayerPrices;
  };
}

export interface PokemonCardResponse {
  data: PokemonCard;
}

export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  abilities: Abilities[];
  types: string[];
  evolvesTo: string[];
  rules: string[];
  attacks: Attack[];
  weaknesses: Weakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: SetInformation;
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers: number[];
  legalities: {
    unlimited: string;
    expanded: string;
  };
  images: {
    small: string;
    large: string;
  };
  tcgplayer: TCGPlayer;
}

export interface PokemonCardsResponse {
  data: PokemonCard[];
}
