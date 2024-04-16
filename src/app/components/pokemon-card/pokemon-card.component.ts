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

  @Output() saveCard: EventEmitter<{name: string, card: PokemonCard}> = new EventEmitter<{name: string, card: PokemonCard}>();
  @Output() removeCard: EventEmitter<{name: string, card: PokemonCard}> = new EventEmitter<{name: string, card: PokemonCard}>();

  handleSaveCard() {
    this.saveCard.emit({name: this.name, card: this.card});
  }

  handleRemoveCard() {
    this.removeCard.emit({name: this.name, card: this.card});
  }

  joinTypes(types: string[]) {
    return types.join(', ');
  }
}
