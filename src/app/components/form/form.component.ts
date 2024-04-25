import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IgxModule } from 'src/app/shared/igx/igx.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [IgxModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() deckName!: string;
  @Input() hasCard!: boolean;

  @Output() onFindPokemon = new EventEmitter<Event>();
  @Output() onSaveDeck = new EventEmitter<void>();

  findPokemon(event: Event) {
    this.onFindPokemon.emit(event);
  }

  saveDeck() {
    this.onSaveDeck.emit();
  }
}
