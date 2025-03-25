import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {
  videoId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.videoId = this.route.snapshot.queryParamMap.get('v');
    console.log("video id is:", this.videoId)
  }
}