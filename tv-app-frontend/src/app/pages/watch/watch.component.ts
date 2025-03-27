import { Component, OnInit, signal, computed } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MovieService } from '../../services/movie.service'

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  paramVideoId = signal<string | null>(null)
  videoId = computed(() => {
    return parseInt(this.paramVideoId()??'-1')
  })
  hasLoaded = signal(false)
  error = signal<string | null>(null)
  title = signal<string | null>(null)
  description = signal<string | null>(null)
  movieFile = signal<string | null>(null)
  movieSrc = computed(() => {
    return `${MovieService.movieHostUrl()}${this.movieFile()}`
  })

  ngOnInit() {
    this.paramVideoId.set(this.route.snapshot.queryParamMap.get('v'))
    console.log("video id is:", this.videoId())
    MovieService.getMovie(this.videoId())
      .then(response => {
        console.log("w response",response)
        if (response){
          this.hasLoaded.set(true)
          this.title.set(response.title)
          this.description.set(response.description)
          this.movieFile.set(response.movie_file)
        } else {
          this.error.set('No movie found')
        }
      })
      .catch(error => {
        console.error('API Error:', error)
        this.error.set('Failed to load movie')
      }
    )
  }
}