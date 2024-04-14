import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from 'src/services/poke-api.service';
import { PokemonCard } from 'src/types/pokemon-api';
import { CardComponent } from '../components/card/card.component';
import { IgxModule } from '../shared/igx/igx.module';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [IgxModule, CardComponent, FormsModule],
  providers: [PokeApiService],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent implements OnInit {
  cards: PokemonCard[] = [];

  name: string = '';

  hasCard: boolean = false;
  isLoading: boolean = true;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.pokeApiService.getPokemonCards().subscribe({
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
    this.hasCard = true;
  }
}
