import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageDeckService } from 'src/services/storage-deck.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { Deck } from 'src/types/pokemon-deck';

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {
  deck!: Deck | undefined;

  constructor(
    private storageDeck: StorageDeckService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.params['name'];

    this.deck = this.storageDeck.getDeck(name);
  }
}
