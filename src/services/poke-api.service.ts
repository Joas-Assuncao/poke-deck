import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PokemonCard,
  PokemonCardResponse,
  PokemonCardsResponse,
} from 'src/types/pokemon-api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  public getPokemonCard(id: string): Observable<PokemonCard> {
    return this.http
      .get<PokemonCardResponse>(`https://api.pokemontcg.io/v2/cards/${id}`)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  public getPokemonCards(): Observable<PokemonCard[]> {
    return this.http
      .get<PokemonCardsResponse>(`https://api.pokemontcg.io/v2/cards`, {
        headers: {
          'X-Api-Key': 'c4319117-0e88-4b80-a40c-5aabb2e4e81a',
        },
      })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}
