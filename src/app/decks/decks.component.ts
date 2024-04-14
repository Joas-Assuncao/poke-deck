import { Component, HostBinding } from '@angular/core';
import { PokeApiService } from 'src/services/poke-api.service';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { Deck } from 'src/types/pokemon-deck';
import { CardComponent } from '../components/card/card.component';
import { EmptyStateComponent } from '../components/empty-state/empty-state.component';
import { IgxModule } from '../shared/igx/igx.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [IgxModule, CardComponent, EmptyStateComponent, RouterLink],
  providers: [PokeApiService],
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
})
export class DecksComponent {
  pokemonDecks!: Deck[];
  isLoading: boolean = false;

  constructor(private storageDeck: StorageDeckService) {}

  ngOnInit() {
    this.pokemonDecks = this.storageDeck.getDeckList();
  }

  @HostBinding('style.--ig-size')
    protected get sizeStyle() {
      return `var(--ig-size-large)`;
    }
}
