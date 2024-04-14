import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Injectable({
  providedIn: 'root',
})
export class StorageDeckService {
  private decks!: BehaviorSubject<Deck[]>;
  private deck!: BehaviorSubject<Deck>;

  constructor() {}

  public getDeckList(): Deck[] {
    return this.decks.getValue();
  }

  public $getDeckList(): Observable<Deck[]> {
    return this.decks.asObservable();
  }

  public saveDeckList(deck: Deck): void {
    this.decks.next([...this.getDeckList(), deck]);
  }

  public getDeck(name: string): Deck | undefined {
    return this.decks.getValue().find((deck) => deck.name === name);
  }

  public $getDeck(): Observable<Deck> {
    return this.deck.asObservable();
  }

  public saveDeck(card: PokemonCard, name: string): void {
    const deck = this.getDeck(name);
    if (deck) {
      deck.cards.push(card);
      this.deck.next(deck);
    }
  }
}
