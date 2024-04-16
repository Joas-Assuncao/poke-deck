import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PokeApiService } from 'src/services/poke-api.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { IgxModule } from '../shared/igx/igx.module';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { IgxToastComponent } from 'igniteui-angular';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [IgxModule, PokemonCardComponent, FormsModule, RouterLink],
  providers: [PokeApiService],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent implements OnInit, OnDestroy {
  @ViewChild('toast', { read: IgxToastComponent })
  public toast!: IgxToastComponent;

  cards: PokemonCard[] = [];

  deckName: string = '';
  cardName: string = '';

  hasCard: boolean = false;
  isLoading: boolean = true;
  isLoadingMore: boolean = false;
  page: number = 1;

  deck: Deck | undefined = {
    name: '',
    cards: [],
  };

  trainers: number = 0;
  pokemons: number = 0;

  constructor(
    private pokeApiService: PokeApiService,
    private storageDeck: StorageDeckService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    if (this.route.snapshot.params['name']) {
      this.deckName = this.route.snapshot.params['name'];
      this.deck = this.storageDeck.getDeck(this.deckName);
    }

    this.pokeApiService.getPokemonCards({ page: 1, pageSize: 20 }).subscribe({
      next: (response) => {
        this.cards = response.map((card) => {
          const deck = this.deck;
          if (deck) {
            card.added = deck.cards.some((deckCard) => deckCard.id === card.id);
          }
          return card;
        });
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

  saveDeck() {
    if (!this.deckName) {
      this.toast.open('Digite um nome para adicionar baralho!');
    }

    const deck: Deck = {
      name: this.deckName,
      cards: this.cards.filter((card) => card.added),
    };

    if (deck.cards.length < 24 || deck.cards.length > 60) {
      this.toast.open('O baralho precisa ter entre 24 e 60 cartas!');
    }

    this.storageDeck.saveDeck(deck);
    this.router.navigate(['/decks']);
  }

  findPokemon(event: any) {
    event.preventDefault();
    this.cardName = event.target.value;

    this.isLoading = true;
    this.pokeApiService.getPokemonCards({ name: this.cardName }).subscribe({
      next: (response) => {
        this.cards = response.map((card) => {
          const deck = this.deck;
          if (deck) {
            card.added = deck.cards.some((deckCard) => deckCard.id === card.id);
          }
          return card;
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  saveCard({ name, card }: { name: string; card: PokemonCard }) {
    const cardsWithSameName = this.deck?.cards ? this.deck?.cards?.filter(cardAdded => cardAdded.name === card.name).length : 0;

    if (this.deck && cardsWithSameName < 4) {
      this.deck.name = name;
      this.hasCard = true;
      card.added = true;
      this.deck.cards.push(card);
      this.filterBySuperType(card);
      return;
    }

    this.toast.open('Você já adicionou 4 cartas com este nome ao baralho!');
  }

  removeCard({ card }: { card: PokemonCard }) {
    if (this.deck) {
      this.deck.cards = this.deck.cards.filter(
        (deckCard) => deckCard.id !== card.id
      );

      card.added = false;
    }
  }

  loadMore() {
    this.isLoadingMore = true;
    this.page++;
    this.pokeApiService
      .getPokemonCards({ page: this.page, name: this.cardName })
      .subscribe({
        next: (response) => {
          this.cards = [
            ...this.cards,
            ...response.map((card) => {
              const deck = this.deck;
              if (deck) {
                card.added = deck.cards.some(
                  (deckCard) => deckCard.id === card.id
                );
              }
              return card;
            }),
          ];
          this.isLoadingMore = false;
        },
        error: (error) => {
          this.isLoadingMore = false;
          console.error(error);
        },
      });
  }

  filterBySuperType(card: PokemonCard) {
    if (card.supertype === 'Pokémon') {
      this.pokemons++;
    } else if (card.supertype === 'Trainer') {
      this.trainers++;
    }
  }
}
