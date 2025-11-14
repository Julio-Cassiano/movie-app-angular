import { Component, OnInit, Signal } from '@angular/core';
import { MovieCard } from "../movie-card/movie-card";
import { MovieModel } from '../../../movie.model';
import { MovieService } from '../../../services/movie.service';
import { ButtonAdd } from '../../shared/button-add/button-add';
import { EditMovieDialog } from '../edit-movie-dialog/edit-movie-dialog';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, ButtonAdd, EditMovieDialog],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {
  public movies: Signal<MovieModel[]>;
  public isEditingMovie: Signal<boolean>;
  public isAddingMovie: Signal<boolean>;
  
  constructor(private movieService: MovieService){
    this.movies = this.movieService.movies;
    this.isEditingMovie = this.movieService.isEditingMovie();
    this.isAddingMovie = movieService.isAddinMovie();
  }

  ngOnInit(): void {
    this.movieService.fetchMovies();
  }

  public refreshMovies(): void {
    this.movieService.refreshMovies();
  }

  public createMovie() {
    this.movieService.createMovie();
  }
}
