import { computed, Injectable, signal } from '@angular/core';
import { CreatingOrEditingMovie, MovieModel } from '../movie.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/movies';

  private _movies = signal<MovieModel[]>([]);
  public movies = computed(() => this._movies());

  private _isEditingMovie = signal<boolean>(false);
  public isEditingMovie = computed(() => this._isEditingMovie);

  private _isAddingMovie = signal<boolean>(false);
  public isAddingMovie = computed(() => this._isAddingMovie);

  private _editedMovie= signal<CreatingOrEditingMovie | null>(null);
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

  public editMovie(movie: MovieModel){
      this._editingMovie.set(movie);
      this._isEditingMovie.set(true);
  }

  public closeEditModal(): void {
      this._editingMovie.set(undefined);
      this._isEditingMovie.set(false);
      this._isAddingMovie.set(false);
  }

  public sendEditedMovie(id: number, movie: CreatingOrEditingMovie): Observable<CreatingOrEditingMovie> {
      return this.httpClient.patch<CreatingOrEditingMovie>(`${this.apiUrl}/${id}`, movie);
  }
  
  public createMovie() {
    this._isAddingMovie.set(true);
  }

  public sendNewMovie(movie: CreatingOrEditingMovie) {
    return this.httpClient.post<CreatingOrEditingMovie>(this.apiUrl, movie);
  }

  public deleteMovie(id: number) {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  public refreshMovieSignal(id: number) {
    this._movies.update(movies => 
      movies.filter(movie => movie.id != id)
    );
  }
}
