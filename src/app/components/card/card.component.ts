import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IgxModule } from 'src/app/shared/igx/igx.module';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IgxModule, RouterLink],
  providers: [StorageDeckService],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() name!: string;
  @Input() deck!: Deck;
  @Input() card!: PokemonCard;

  @Output() savedCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private storageDeck: StorageDeckService) {
  }

  saveCard(card: PokemonCard) {
    card.added = true;
    this.storageDeck.saveCard({
      card,
      name: this.name,
    });
  }

  removeCard(card: PokemonCard) {
    card.added = false;
    this.storageDeck.removeCard({
      card,
      name: this.name,
    });
  }

  needComma(index: string, length: number) {
    return Number(index) < length - 1;
  }
}
