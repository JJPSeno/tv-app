import axios from 'axios';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {
  videoId = signal<string | null>(null)
  hasLoaded = signal(false)
  error = signal<string | null>(null)
  title = signal<string | null>(null)
  description = signal<string | null>(null)

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.videoId.set(this.route.snapshot.queryParamMap.get('v'))
    console.log("video id is:", this.videoId())
    axios.get(`https://fakestoreapi.com/products/${this.videoId()}`)
      .then(response => {
        if (response.data){
          this.hasLoaded.set(true)
          this.title.set(response.data.title)
          this.description.set(response.data.description)
        } else {
          this.error.set('Empty Response');
        }
      })
      .catch(error => {
        console.error('API Error:', error)
        this.error.set('Fetching Error')
      }
    )
  }
}