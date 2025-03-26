import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MovieList } from '../../../../models/movie.model'

@Component({
  selector: 'movie-list-section',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  @Input() videoId: number | null = null
  @Input() movieList: MovieList = []
  @Output() movieSelected = new EventEmitter<number>()

  onMovieClick(value: number){
    this.movieSelected.emit(value)
    console.log(value)
  }
}