import axios from 'axios';
import { Component, OnInit, signal, computed } from '@angular/core';
import { UploadComponent } from './components/upload/upload.component';
import { PlayComponent } from './components/play/play.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieList } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  imports: [UploadComponent, PlayComponent, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hasLoaded = signal(false)
  error = signal<string | null>(null)
  movieList = signal<MovieList>([])
  cursor = signal<number | null>(null)
  currentMovie = computed(() => {
    return this.movieList().find(movie => movie.id === this.cursor()) || null
  })

  updateCursor(value: number) {
    console.log("updated cursor: ", value)
    this.cursor.set(value)
  }

  ngOnInit(): void {
    axios.get<MovieList>(`https://fakestoreapi.com/products`)
      .then(response => {
        if (response.data.length > 0){
          this.movieList.set(response.data)
          this.cursor.set(response.data[0].id)
          this.hasLoaded.set(true)
        } else {
          this.error.set('Empty Response');
        }
      })
      .catch(() => {
        this.error.set('Fetching Error');
      });
  }
}
