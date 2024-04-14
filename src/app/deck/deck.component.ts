import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from 'src/services/poke-api.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { CardComponent } from '../components/card/card.component';
import { IgxModule } from '../shared/igx/igx.module';
import { RouterLink } from '@angular/router';
import { StorageDeckService } from 'src/services/storage-deck.service';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [IgxModule, CardComponent, FormsModule, RouterLink],
  providers: [PokeApiService],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent implements OnInit, OnDestroy {
  cards: PokemonCard[] = [];

  deckName: string = '';
  cardName: string = '';

  hasCard: boolean = false;
  isLoading: boolean = true;
  isLoadingMore: boolean = false;
  page: number = 1;

  constructor(
    private pokeApiService: PokeApiService,
    private storageDeck: StorageDeckService
  ) {}

  ngOnDestroy(): void {
    const deck = this.storageDeck.getDeck(this.deckName);
    if(deck && deck.cards.length < 24) {
      this.storageDeck.clearDeck(this.deckName);
    }
  }

  findPokemon(event: any) {
    event.preventDefault();
    this.cardName = event.target.value;
    
    this.isLoading = true;
    this.pokeApiService.getPokemonCards({name: this.cardName}).subscribe({
      next: (response) => {
        this.cards = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.pokeApiService.getPokemonCards({page: 1, pageSize: 10}).subscribe({
      next: (response) => {
        this.cards = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  savedCard(event: boolean) {
    this.hasCard = event;
  }

  loadMore() {
    this.isLoadingMore = true;
    this.page++;
    this.pokeApiService.getPokemonCards({ page: this.page, name: this.cardName }).subscribe({
      next: (response) => {
        this.cards = [...this.cards, ...response];
        this.isLoadingMore = false;
      },
      error: (error) => {
        this.isLoadingMore = false;
        console.error(error);
      },
    });
  }
}
