import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IgxModule } from 'src/app/shared/igx/igx.module';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Component({
  selector: 'app-deck-card',
  standalone: true,
  imports: [IgxModule, RouterLink],
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css'],
})
export class DeckCardComponent {
  @Input() deck!: Deck;

  constructor(private storageDeck: StorageDeckService) {}

  deleteDeck() {
    this.storageDeck.removeDeck(this.deck.name);
  }

  needComma(index: string, length: number) {
    return Number(index) < length - 1;
  }
}
