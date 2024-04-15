import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StorageDeckService } from 'src/services/storage-deck.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  providers: [StorageDeckService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-deck';
}
