import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Injectable({
  providedIn: 'root',
})
export class StorageDeckService {
  private decksSubject: BehaviorSubject<Deck[]> = new BehaviorSubject<Deck[]>(
    []
  );
  decks$: Observable<Deck[]> = this.decksSubject.asObservable();

  constructor() {}

  addCardToDeck(name: string, card: PokemonCard) {
    const decks = this.decksSubject.value;
    const deckIndex = decks.findIndex((deck) => deck.name === name);

    if (deckIndex !== -1) {
      const updatedDeck = decks[deckIndex];
      updatedDeck.cards.push(card);
      decks[deckIndex] = updatedDeck;
      this.decksSubject.next(decks);
    } else {
      const newDeck: Deck = { name, cards: [card] };
      decks.push(newDeck);
      this.decksSubject.next(decks);
    }
  }
}
