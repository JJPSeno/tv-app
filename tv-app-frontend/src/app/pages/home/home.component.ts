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
  title = 'Bee Movie'
  description = `Barry B. Benson, an idealistic honey bee who has the ability to talk to humans, has recently graduated from college and is about to enter the hive's honey-making workforce, Honex Industries, with his best friend, Adam Flayman. Barry is initially excited, but his ambitious, insubordinate attitude emerges upon discovering that his choice of job will never change once picked. Later, the two bees run into a group of pollen jocks, bees who collect pollen from flowers outside the hive, and they offer to take Barry with them if he is "bee enough". While on his first pollen-gathering expedition in New York City, Barry gets lost in the rain, and ends up on the windowsill of a human florist named Vanessa Bloome. Upon noticing Barry, Vanessa's boyfriend Ken attempts to squash him, but Vanessa gently catches and releases Barry outside, saving his life.`
  videoId = 3
  hasLoaded = signal(false)
  error = signal<string | null>(null)
  
  ngOnInit(): void {
    console.log("initial loaded val: ", this.hasLoaded())
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        console.log(response.data)
        this.hasLoaded.set(true)
        console.log("loaded val: ", this.hasLoaded())
      })
      .catch(error => {
        console.error('API Error:', error)
        this.error.set('Fetching Error');
      });
  }
}
