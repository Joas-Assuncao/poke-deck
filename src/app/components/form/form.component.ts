import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IgxModule } from 'src/app/shared/igx/igx.module';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [IgxModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() deckName!: string;
  @Input() hasCard!: boolean;

  @Output() onFindPokemon = new EventEmitter<Event>();
  @Output() onSaveDeck = new EventEmitter<void>();
  @Output() onChangeDeckName = new EventEmitter<string>();

  findPokemon(event: Event) {
    this.onFindPokemon.emit(event);
  }

  saveDeck() {
    this.onSaveDeck.emit();
  }

  changeDeckName(event: string) {
    this.deckName = event;
    this.onChangeDeckName.emit(event);
  }
}
