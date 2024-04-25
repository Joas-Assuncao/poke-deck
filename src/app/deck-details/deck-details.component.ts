import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { Deck } from 'src/types/pokemon-deck';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { IgxModule } from '../shared/igx/igx.module';

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, IgxModule, RouterLink],
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css'],
})
export class DeckDetailsComponent implements OnInit {
  deck!: Deck | undefined;
  trainers: number = 0;
  pokemons: number = 0;
  types: string[] = [];

  constructor(
    private storageDeck: StorageDeckService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.params['name'];
    this.deck = this.storageDeck.getDeck(name);
    this.filterBySuperType();
    this.calculateTypes();
  }

  filterBySuperType() {
    this.deck?.cards.forEach((card) => {
      if (card.supertype === 'Pokémon') {
        this.pokemons++;
      } else if (card.supertype === 'Trainer') {
        this.trainers++;
      }
    });
  }

  calculateTypes() {
    this.deck?.cards.forEach((card) => {
      if (card.types) {
        card.types.forEach((type) => {
          if (!this.types.includes(type)) {
            this.types.push(type);
          }
        });
      }
    });
  }

  joinTypes() {
    return this.types.join(', ');
  }
}
