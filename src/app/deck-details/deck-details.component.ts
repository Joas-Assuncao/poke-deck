import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { Deck } from 'src/types/pokemon-deck';
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

  constructor(
    private storageDeck: StorageDeckService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.params['name'];
    this.deck = this.storageDeck.getDeck(name);
    this.filterBySuperType();
  }

  filterBySuperType() {
    this.deck?.cards.forEach(card => {
      if (card.supertype === 'Pokémon') {
        this.pokemons++;
      } else if (card.supertype === 'Trainer') {
        this.trainers++;
      }
    })
  }
}
