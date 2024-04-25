import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getDeck(name: string): Deck | undefined {
    return this.decksSubject.value.find((deck) => deck.name === name);
  }

  removeDeck(name: string) {
    const decks = this.decksSubject.value;
    const updatedDecks = decks.filter((deck) => deck.name !== name);
    this.decksSubject.next(updatedDecks);
  }

  clearDecks() {
    this.decksSubject.next([]);
  }

  getDecks(): Deck[] {
    return this.decksSubject.value;
  }

  saveDeck(deck: Deck) {
    const decks = this.decksSubject.value;
    const deckIndex = decks.findIndex((d) => d.name === deck.name);

    if (deckIndex !== -1) {
      decks[deckIndex] = deck;
      this.decksSubject.next(decks);
    } else {
      decks.push(deck);
      this.decksSubject.next(decks);
    }
  }
}
