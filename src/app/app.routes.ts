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
];
