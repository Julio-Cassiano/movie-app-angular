import { computed, Injectable, signal } from '@angular/core';
import { MovieModel } from '../movie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8081/movies';

  private _movies = signal<MovieModel[]>([]);
  public movies = computed(() => this._movies());

  constructor(private httpClient: HttpClient){}

  public fetchMovies(): void {
      if(this._movies()?.length > 0) {
          return;
      }

      this.httpClient.get<MovieModel[]>(this.apiUrl)
          .subscribe(movie => {
              this._movies.set(movie);
          });
  }

  public refreshMovies(){
      this.httpClient.get<MovieModel[]>(this.apiUrl)
          .subscribe(movie => {
              this._movies.set(movie);
          })
  }
}
