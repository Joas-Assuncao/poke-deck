import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PokeApiService } from 'src/services/poke-api.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { IgxModule } from '../shared/igx/igx.module';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [IgxModule, PokemonCardComponent, FormsModule, RouterLink],
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

  decks!: Observable<Deck[]>;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit() {
    this.isLoading = true;

    this.pokeApiService.getPokemonCards({ page: 1, pageSize: 20 }).subscribe({
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

  ngOnDestroy(): void {
    console.log('fechou');
  }

  findPokemon(event: any) {
    event.preventDefault();
    this.cardName = event.target.value;

    this.isLoading = true;
    this.pokeApiService.getPokemonCards({ name: this.cardName }).subscribe({
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
    this.pokeApiService
      .getPokemonCards({ page: this.page, name: this.cardName })
      .subscribe({
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
