import { Component, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokeApiService } from 'src/services/poke-api.service';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { Deck } from 'src/types/pokemon-deck';
import { EmptyStateComponent } from '../components/empty-state/empty-state.component';
import { IgxModule } from '../shared/igx/igx.module';
import { DeckCardComponent } from '../components/deck-card/deck-card.component';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [IgxModule, DeckCardComponent, EmptyStateComponent, RouterLink],
  providers: [PokeApiService],
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css'],
})
export class DecksComponent {
  pokemonDecks!: Deck[];

  constructor(private storageDeck: StorageDeckService) {}

  ngOnInit(): void {
    this.storageDeck.decks$.subscribe((decks) => this.pokemonDecks = decks);
  }

  @HostBinding('style.--ig-size')
  protected get sizeStyle() {
    return `var(--ig-size-large)`;
  }
}
