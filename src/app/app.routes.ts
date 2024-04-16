import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'decks',
  },
  {
    path: 'decks',
    loadComponent: () =>
      import('./decks/decks.component').then((m) => m.DecksComponent),
  },
  {
    path: 'decks/create',
    loadComponent: () =>
      import('./deck/deck.component').then((m) => m.DeckComponent),
  },
  {
    path: 'decks/:name',
    loadComponent: () =>
      import('./deck-details/deck-details.component').then((m) => m.DeckDetailsComponent),
  },
  {
    path: 'decks/:name/edit',
    loadComponent: () =>
      import('./deck/deck.component').then((m) => m.DeckComponent),
  },
];
