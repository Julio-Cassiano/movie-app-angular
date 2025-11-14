import { Component, input } from '@angular/core';
import { MovieModel } from '../../../movie.model';
import { DatePipe } from '@angular/common';
import { ButtonEdit } from "../../shared/button-edit/button-edit";
import { MovieService } from '../../../services/movie.service';
import { ButtonDelete } from '../../shared/button-delete/button-delete';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe, ButtonEdit, ButtonDelete],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard {
  movie = input.required<MovieModel>();

  constructor(private movieService: MovieService){}

  editMovie(movie: MovieModel) {
    this.movieService.editMovie(movie);
  }

  deleteMovie(id: number){
    this.movieService.deleteMovie(id)
      .subscribe({
        next: () => {
          console.log('deletado');
          this.movieService.refreshMovies();
        },
        error: (err) => {
          console.log('erro: ', err);
        }
      });
  }
}
