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
  @Input() hasMore: boolean = false
  @Input() movieList: MovieList = []
  @Output() movieSelected = new EventEmitter<number>()
  @Output() loadMoreMovies = new EventEmitter<void>();

  onMovieClick(value: number){
    this.movieSelected.emit(value)
  }
  
  onLoadMoreClick() {
    this.loadMoreMovies.emit();
  }
}