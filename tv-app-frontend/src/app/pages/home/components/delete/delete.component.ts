import { Component, Input, Output, EventEmitter } from '@angular/core'
import { MovieService } from '../../../../services/movie.service'

@Component({
  selector: 'delete-button',
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input() videoId: number | null = null
  @Input() videoTitle: string | null = null
  @Output() movieDeleted = new EventEmitter<number>()

  async deleteMovie() {
    if (this.videoId) {
      console.log(`Emitting event for movie: ${this.videoId}`);
      this.movieDeleted.emit(this.videoId);
  
      try {
        await MovieService.deleteMovie(this.videoId);
        console.log(`Movie ${this.videoId} successfully deleted.`);
      } catch (error) {
        console.error('Failed to delete movie:', error);
      }
    }
  }
}