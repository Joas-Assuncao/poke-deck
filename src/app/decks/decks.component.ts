import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PokeApiService } from 'src/services/poke-api.service';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { Deck } from 'src/types/pokemon-deck';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  providers: [PokeApiService],
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
})
export class DecksComponent {
  pokemonDecks!: Deck[];
  isLoading: boolean = true;

  constructor(private storageDeck: StorageDeckService) {}

  ngOnInit() {
    this.pokemonDecks = this.storageDeck.getDeckList();
  }
}
