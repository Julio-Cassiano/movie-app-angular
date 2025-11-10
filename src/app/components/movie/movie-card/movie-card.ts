import { Component, input } from '@angular/core';
import { MovieModel } from '../../../movie.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard {
  movie = input<MovieModel>();
}
