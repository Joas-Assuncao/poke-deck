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
];
