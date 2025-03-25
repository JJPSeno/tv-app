import axios from 'axios';
import { Component, OnInit, signal, computed } from '@angular/core';
import { UploadComponent } from './components/upload/upload.component';
import { PlayComponent } from './components/play/play.component';

type Movie = {
  id: number
  title: string
  description: string
}

type MovieList = Movie[]

@Component({
  selector: 'app-home',
  imports: [UploadComponent, PlayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hasLoaded = signal(false)
  error = signal<string | null>(null)
  movieList = signal<MovieList | null>(null)
  cursor = signal<number | null>(null)
  currentMovie = signal<Movie | null>(null)

  ngOnInit(): void {
    axios.get<MovieList>(`https://fakestoreapi.com/products`)
      .then(response => {
        if (response.data.length > 0){
          this.movieList.set(response.data)
          this.cursor.set(response.data[0].id)
          this.currentMovie.set(
            this.movieList()?.find(
              (movie) => movie.id === this.cursor()
            )??null
          )
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
