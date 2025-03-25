import { Component } from '@angular/core';
import { UploadComponent } from './components/upload/upload.component';
import { PlayComponent } from './components/play/play.component';

@Component({
  selector: 'app-home',
  imports: [UploadComponent, PlayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
