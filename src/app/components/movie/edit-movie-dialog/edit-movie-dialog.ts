import { Component, input, OnInit, Signal } from '@angular/core';
import { CreatingOrEditingMovie, MovieModel } from '../../../movie.model';
import { MovieService } from '../../../services/movie.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-movie-dialog',
  imports: [FormsModule],
  templateUrl: './edit-movie-dialog.html',
  styleUrl: './edit-movie-dialog.css'
})
export class EditMovieDialog implements OnInit{
  private initialMovieData: Signal<MovieModel | undefined>;
  public movieData!: CreatingOrEditingMovie;

  create_movie = input<boolean>(false);

  constructor(private movieService: MovieService){
    this.initialMovieData = movieService.editingMovie();
  }

  get directorInput() {
    return this.movieData.directorNames.join(', ');
  }

  set directorInput(value: string) {
    if (value === '') {
      this.movieData.directorNames = []
      return;
    }

    this.movieData.directorNames = value.split(', ').map(name => name.trim()).filter(name => name.length > 0);
  }

  ngOnInit(): void {
    this.movieData= {
      name: '',
      synopsis: '',
      releaseDate: '',
      durationInSeconds: 0,
      imagePath: '',
      username: '',
      directorNames: []
      }

    const currentMovieData = this.initialMovieData();

    if(currentMovieData) {
      this.movieData = {...currentMovieData};
    }
  }

  onCloseDialog() {
    this.movieService.closeEditModal();
  }

  sendEditedData() {
    this.movieService.sendEditedMovie(this.initialMovieData()!.id, this.movieData)
      .subscribe({
        next: () => {
          this.movieService.refreshMovies();
        },
        error: (err) => {
          console.log("erro: ", err);
        }
      })

      this.onCloseDialog();
  }

  sendNewMovie() {
    this.movieService.sendNewMovie(this.movieData)
      .subscribe({
        next: () => {
          this.movieService.refreshMovies();
        },
        error: (err) => {
          console.log("erro: ", err)
        }
      })

      this.onCloseDialog();
  }
}
