import axios from 'axios';
import { Component, OnInit, signal } from '@angular/core';
import { UploadComponent } from './components/upload/upload.component';
import { PlayComponent } from './components/play/play.component';

@Component({
  selector: 'app-home',
  imports: [UploadComponent, PlayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ////
  // This is actually watch.component logic
  ///
  videoId = 33
  hasLoaded = signal(false)
  error = signal<string | null>(null)
  title = signal<string | null>(null)
  description = signal<string | null>(null)
  
  ngOnInit(): void {
    console.log("initial loaded val: ", this.hasLoaded())
    axios.get(`https://fakestoreapi.com/products/${this.videoId}`)
      .then(response => {
        console.log(response.data)
        if (response.data){
          this.hasLoaded.set(true)
          this.title.set(response.data.title)
          this.description.set(response.data.description)
          console.log("loaded val: ", this.hasLoaded())
        } else {
          this.error.set('Empty Response');
        }
      })
      .catch(error => {
        console.error('API Error:', error)
        this.error.set('Fetching Error');
      });
  }
}
