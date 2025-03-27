import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'play-button',
  imports: [RouterLink],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
  @Input() videoId: number | null = null
}