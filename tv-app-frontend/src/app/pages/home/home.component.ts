import { Component, OnInit, signal, computed } from '@angular/core'
import { UploadComponent } from './components/upload/upload.component'
import { PlayComponent } from './components/play/play.component'
import { DetailsComponent } from './components/details/details.component'
import { MovieListComponent } from './components/movie-list/movie-list.component'
import { ModalComponent } from './components/modal/modal.component'
import { MovieList } from '../../models/movie.model'
import { MovieService } from '../../services/movie.service'

@Component({
  selector: 'app-home',
  imports: [UploadComponent, PlayComponent, MovieListComponent, DetailsComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hasLoaded = signal(false)
  error = signal<string | null>(null)
  movieList = signal<MovieList>([])
  cursor = signal<number | null>(null)
  pageNext = signal<string | null>(null)
  pagePrev = signal<string | null>(null)
  currentMovie = computed(() => {
    return this.movieList().find(movie => movie.id === this.cursor()) || null
  })

  updateCursor(value: number) {
    console.log("updated cursor: ", value)
    this.cursor.set(value)
  }

  loadNextPage(): void {
    if (!this.pageNext()){
      return
    }
  
    MovieService.getMovies(this.pageNext()??undefined)
      .then(response => {
        if (response.results.length > 0) {
          this.movieList.set([...this.movieList(), ...response.results])
          this.pageNext.set(response.next)
          this.pagePrev.set(response.previous)
        } else {
          this.error.set('No more movies to load')
        }
      })
      .catch(() => {
        this.error.set('Fetching Error')
      })
  }

  ngOnInit(): void {
    MovieService.getMovies()
      .then(response => {
        if (response.results.length > 0){
          this.movieList.set(response.results)
          this.pageNext.set(response.next)
          this.pagePrev.set(response.previous)
          this.cursor.set(response.results[0].id)
          this.hasLoaded.set(true)
        } else {
          this.error.set('Empty Response')
        }
      })
      .catch(() => {
        this.error.set('Fetching Error')
      })
  }
}
