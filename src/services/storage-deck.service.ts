import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Injectable({
  providedIn: 'root',
})
export class StorageDeckService {
  private decks
  : BehaviorSubject<Deck[]> = new BehaviorSubject<Deck[]>([]);

  constructor() {}

  public getDeckList(): Deck[] {
    return [...this.decks.getValue()];
  }

  public $getDeckList(): Observable<Deck[]> {
    return this.decks.asObservable();
  }

  public saveDeck(deck: Deck): void {
    const decks = this.getDeckList();

    const index = decks.findIndex((d) => d.name === deck.name);

    if (index === -1) {
      this.decks.next([...decks, deck])
    }

    const newDecks = decks.filter((d) => d.name !== deck.name);

    this.decks.next([...newDecks, deck]);
  }

  public getDeck(name: string): Deck | undefined {
    return this.getDeckList().find((deck) => deck.name === name);
  }

  public saveCard({ card, name }: { card: PokemonCard; name: string }): void {
    const deck = this.getDeck(name);

    if (!deck) {
      const newDeck: Deck = {
        name,
        cards: [card],
      };
      this.saveDeck(newDeck);
      return;
    }

    const newDeck = {...deck, cards: [...deck.cards, card]};

    console.log(newDeck);

    this.saveDeck(newDeck);
  }

  public removeCard({ card, name }: { card: PokemonCard; name: string }): void {
    const deck = this.getDeck(name);

    if (!deck) {
      return;
    }

    deck.cards = deck.cards.filter((c) => c.id !== card.id);

    this.saveDeck(deck);
  }

  public clearDeck(name: string): void {
    const deck = this.getDeck(name);

    if (!deck) {
      return;
    }

    deck.cards = [];

    this.saveDeck(deck);
  }
}
