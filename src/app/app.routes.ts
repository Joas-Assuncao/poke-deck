import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list-decks',
  },
  {
    path: 'list-decks',
    loadComponent: () =>
      import('./pages/list-decks/list-decks.component').then(
        (m) => m.ListDecksComponent
      ),
    data: { title: 'Meus baralhos' },
  },
  {
    path: 'decks/create',
    loadComponent: () =>
      import('./pages/create-deck/create-deck.component').then(
        (m) => m.CreateDeckComponent
      ),
    data: { title: 'Criar baralho' },
  },
  {
    path: 'decks/:name',
    loadComponent: () =>
      import('./pages/deck-details/deck-details.component').then(
        (m) => m.DeckDetailsComponent
      ),
    data: { title: 'Detalhes do baralho' },
  },
  {
    path: 'decks/:name/edit',
    loadComponent: () =>
      import('./pages/create-deck/create-deck.component').then(
        (m) => m.CreateDeckComponent
      ),
    data: { title: 'Editar baralho' },
  },
];
