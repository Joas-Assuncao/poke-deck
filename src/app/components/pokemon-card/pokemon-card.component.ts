import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IgxModule } from 'src/app/shared/igx/igx.module';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [IgxModule, RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() name!: string;
  @Input() deckName!: string;
  @Input() deck!: Deck;
  @Input() card!: PokemonCard;

  @Output() savedCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private storageDeck: StorageDeckService) {}

  saveCard() {
    this.card.added = true;
    this.storageDeck.addCardToDeck(this.name, this.card);
    this.savedCard.emit(true);
  }

  removeCard() {
    this.card.added = false;
    this.storageDeck.removeCardFromDeck(this.name, this.card);
    this.savedCard.emit(false);
  }

  needComma(index: string, length: number) {
    return Number(index) < length - 1;
  }
}
