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
      import('./list-decks/list-decks.component').then(
        (m) => m.ListDecksComponent
      ),
    data: { title: 'Meus baralhos' },
  },
  {
    path: 'decks/create',
    loadComponent: () =>
      import('./create-deck/create-deck.component').then(
        (m) => m.CreateDeckComponent
      ),
    data: { title: 'Criar baralho' },
  },
  {
    path: 'decks/:name',
    loadComponent: () =>
      import('./deck-details/deck-details.component').then(
        (m) => m.DeckDetailsComponent
      ),
    data: { title: 'Detalhes do baralho' },
  },
  {
    path: 'decks/:name/edit',
    loadComponent: () =>
      import('./create-deck/create-deck.component').then(
        (m) => m.CreateDeckComponent
      ),
    data: { title: 'Editar baralho' },
  },
];
