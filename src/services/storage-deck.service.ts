import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Injectable({
  providedIn: 'root',
})
export class StorageDeckService {
  private decks!: BehaviorSubject<Deck[]>;
  private deck!: BehaviorSubject<Deck>;

  constructor() {
    this.decks = new BehaviorSubject<Deck[]>([]);
    this.deck = new BehaviorSubject<Deck>({
      name: '',
      cards: [],
    });
  }

  public getDeckList(): Deck[] {
    return this.decks.getValue();
  }

  public $getDeckList(): Observable<Deck[]> {
    return this.decks.asObservable();
  }

  public saveDeckList(deck: Deck): void {
    const decks = this.decks.getValue();
    decks.push(deck);
    this.decks.next(decks);
  }

  public getDeck(name: string): Deck | undefined {
    return this.decks.getValue().find((deck) => deck.name === name);
  }

  public $getDeck(): Observable<Deck> {
    return this.deck.asObservable();
  }

  public saveCard({ card, name }: {card: PokemonCard, name: string}): void {
    const deck = this.getDeck(name);

    if (deck) {
      deck.cards.push(card);
      this.deck.next(deck);
      this.saveDeckList(deck);
      return;
    }

    this.saveDeckList({
      name,
      cards: [card],
    });
  }

  public removeCard({ card, name }: {card: PokemonCard, name: string}): void {
    const deck = this.getDeck(name);
    if (!deck) {
      return;
    }

    deck.cards = deck.cards.filter((c) => c.id !== card.id);
    this.deck.next(deck);
  }
}
