import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxCardModule } from 'igniteui-angular';
import { Deck } from 'src/types/pokemon-deck';
import { PokemonCard } from 'src/types/pokemon-api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, IgxCardModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() deck!: Deck;
  @Input() card!: PokemonCard;

  needComma(index: string, length: number) {
    return Number(index) < length - 1;
  }
}
