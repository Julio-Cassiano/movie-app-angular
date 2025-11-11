import { Component, OnInit, Signal } from '@angular/core';
import { CreatingMovie, MovieModel } from '../../../movie.model';
import { MovieService } from '../../../services/movie.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-movie-dialog',
  imports: [FormsModule],
  templateUrl: './edit-movie-dialog.html',
  styleUrl: './edit-movie-dialog.css'
})
export class EditMovieDialog implements OnInit{
  public editedMovie!: CreatingMovie;
  private initialMovieData: Signal<MovieModel | undefined>;

  constructor(private movieService: MovieService){
    this.initialMovieData = movieService.editingMovie();
  }

  ngOnInit(): void {
    this.editedMovie= {
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
      this.editedMovie = {...currentMovieData};
    }
  }

  onCloseDialog() {
    this.movieService.closeEditModal();
  }

  sendEditedData() {
    this.movieService.sendEditedMovie(this.initialMovieData()!.id, this.editedMovie)
      .subscribe({
        next: (movieFromApi) => {
          this.movieService.refreshMovies();
        },
        error: (err) => {
          console.log("porra", err);
        }
      })

      this.onCloseDialog();
  }
}
