import { Component, EventEmitter, input, Output } from '@angular/core';
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
  @Output() deleteMovie = new EventEmitter<number>();
  @Output() editMovie = new EventEmitter<MovieModel>();

  onEdit() {
    this.editMovie.emit(this.movie());
  }

  onDelete(){
    this.deleteMovie.emit(this.movie().id);
  }
}
