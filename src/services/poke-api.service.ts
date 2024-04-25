import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, map } from 'rxjs';
import { PokemonCard, PokemonCardsResponse } from 'src/types/pokemon-api';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  public getPokemonCards({
    page = 1,
    pageSize = 250,
    name,
  }: {
    page?: number;
    pageSize?: number;
    name?: string;
  }): Observable<PokemonCard[]> {
    return this.http
      .get<PokemonCardsResponse>(
        `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}&orderBy=name`,
        {
          headers: {
            'X-Api-Key': 'c4319117-0e88-4b80-a40c-5aabb2e4e81a',
          },
          params: {
            ...(name
              ? {
                  q: `name:${name}*`,
                }
              : {}),
          },
        }
      )
      .pipe(
        debounceTime(500),
        map((response) => {
          return response.data.map((card) => ({ ...card, added: false }));
        })
      );
  }
}
