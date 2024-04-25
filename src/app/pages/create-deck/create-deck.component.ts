import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IgxToastComponent } from 'igniteui-angular';
import { FormComponent } from 'src/app/components/form/form.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { IgxModule } from 'src/app/shared/igx/igx.module';
import { PokeApiService } from 'src/services/poke-api.service';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { Deck } from 'src/types/pokemon-deck';

@Component({
  selector: 'app-create-deck',
  standalone: true,
  imports: [
    IgxModule,
    PokemonCardComponent,
    FormComponent,
    LoaderComponent,
    RouterLink,
    FormsModule,
  ],
  providers: [PokeApiService],
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css'],
})
export class CreateDeckComponent implements OnInit {
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

    this.pokeApiService.getPokemonCards({ page: this.page }).subscribe({
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

  saveDeck() {
    if (!this.deckName) {
      this.toast.open('Digite um nome para adicionar baralho!');
      return;
    }

    const deck: Deck = {
      name: this.deckName,
      cards: this.cards.filter((card) => card.added),
    };

    if (deck.cards.length < 24 || deck.cards.length > 60) {
      this.toast.open('O baralho precisa ter entre 24 e 60 cartas!');
      return;
    }

    this.storageDeck.saveDeck(deck);
    this.router.navigate(['/list-decks']);
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
    const cardsWithSameName = this.deck?.cards
      ? this.deck?.cards?.filter((cardAdded) => cardAdded.name === card.name)
          .length
      : 0;

    if (this.deck && cardsWithSameName < 4) {
      this.deck.name = name;
      this.hasCard = true;
      card.added = true;
      this.deck.cards.push(card);
      this.sumBySuperType(card);
      return;
    }

    this.toast.open('Você já adicionou 4 cartas com este nome ao baralho!');
  }

  removeCard({ card }: { card: PokemonCard }) {
    if (this.deck) {
      this.deck.cards = this.deck.cards.filter(
        (deckCard) => deckCard.id !== card.id
      );

      this.subBySuperType(card);

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

  sumBySuperType(card: PokemonCard) {
    if (card.supertype === 'Pokémon') {
      this.pokemons++;
    } else if (card.supertype === 'Trainer') {
      this.trainers++;
    }
  }

  subBySuperType(card: PokemonCard) {
    if (card.supertype === 'Pokémon') {
      this.pokemons--;
    } else if (card.supertype === 'Trainer') {
      this.trainers--;
    }
  }

  changeDeckName(event: string) {
    this.deckName = event;
  }
}
