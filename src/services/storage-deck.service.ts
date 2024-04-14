import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Injectable({
  providedIn: 'root',
})
export class StorageDeckService {
  private decks!: BehaviorSubject<Deck[]>;

  constructor() {
    this.decks = new BehaviorSubject<Deck[]>([]);
  }

  public getDeckList(): Deck[] {
    return this.decks.getValue();
  }

  public $getDeckList(): Observable<Deck[]> {
    return this.decks.asObservable();
  }

  public saveDeckList(deck: Deck): void {
    const decks = this.getDeckList();

    const index = decks.findIndex((d) => d.name === deck.name);

    if (index === -1) {
      decks.push(deck);
    } else {
      decks[index] = deck;
    }

    this.decks.next(decks);
  }

  public getDeck(name: string): Deck | undefined {
    return this.getDeckList().find((deck) => deck.name === name);
  }

  public saveCard({ card, name }: { card: PokemonCard; name: string }): void {
    const deck = this.getDeck(name);

    if (!deck) {
      return;
    }

    deck.cards.push(card);

    this.saveDeckList(deck);
  }

  public removeCard({ card, name }: { card: PokemonCard; name: string }): void {
    const deck = this.getDeck(name);

    if (!deck) {
      return;
    }

    deck.cards = deck.cards.filter((c) => c.id !== card.id);

    this.saveDeckList(deck);
  }

  public clearDeck(name: string): void {
    const deck = this.getDeck(name);

    if (!deck) {
      return;
    }

    deck.cards = [];

    this.saveDeckList(deck);
  }
}
