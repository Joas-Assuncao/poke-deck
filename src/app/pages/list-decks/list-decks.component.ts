import { Component, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeckCardComponent } from 'src/app/components/deck-card/deck-card.component';
import { EmptyStateComponent } from 'src/app/components/empty-state/empty-state.component';
import { IgxModule } from 'src/app/shared/igx/igx.module';
import { PokeApiService } from 'src/services/poke-api.service';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { Deck } from 'src/types/pokemon-deck';

@Component({
  selector: 'app-list-decks',
  standalone: true,
  imports: [IgxModule, DeckCardComponent, EmptyStateComponent, RouterLink],
  providers: [PokeApiService],
  templateUrl: './list-decks.component.html',
  styleUrls: ['./list-decks.component.css'],
})
export class ListDecksComponent {
  pokemonDecks!: Deck[];

  constructor(private storageDeck: StorageDeckService) {}

  ngOnInit(): void {
    this.storageDeck.decks$.subscribe((decks) => (this.pokemonDecks = decks));
  }

  @HostBinding('style.--ig-size')
  protected get sizeStyle() {
    return `var(--ig-size-large)`;
  }
}
