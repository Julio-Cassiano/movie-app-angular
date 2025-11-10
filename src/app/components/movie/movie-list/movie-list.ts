import { Component, OnInit, Signal } from '@angular/core';
import { MovieCard } from "../movie-card/movie-card";
import { MovieModel } from '../../../movie.model';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {
  public movies: Signal<MovieModel[]>;
  
  constructor(private movieService: MovieService){
    this.movies = this.movieService.movies;
  }

  ngOnInit(): void {
    this.movieService.fetchMovies();
  }

  public refreshMovies(): void {
    this.movieService.refreshMovies();
  }
}
