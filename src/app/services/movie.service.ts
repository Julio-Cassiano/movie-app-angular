import { computed, Injectable, signal } from '@angular/core';
import { CreatingMovie, MovieModel } from '../movie.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8081/movies';

  private _movies = signal<MovieModel[]>([]);
  public movies = computed(() => this._movies());

  private _isAddingOrEditingMovie = signal<boolean>(false);
  public isAddingOrEditingMovie = computed(() => this._isAddingOrEditingMovie);

  private _editedMovie= signal<CreatingMovie | null>(null);
  public editedMovie = computed(() => this._editedMovie());

  private _editingMovie= signal<MovieModel | undefined>(undefined);
  public editingMovie = computed(() => this._editingMovie);

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

  public editUser(movie: MovieModel){
      this._editingMovie.set(movie);
      this.openEditModal();
  }

  public openEditModal(): void {
      this._isAddingOrEditingMovie.set(true);
  }

  public closeEditModal(): void {
      this._isAddingOrEditingMovie.set(false);
  }

  public sendEditedMovie(id: number, user: CreatingMovie): Observable<CreatingMovie> {
      return this.httpClient.patch<CreatingMovie>(`${this.apiUrl}/${id}`, user);
  }   
}
