import { Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'
import { ModalService } from '../../../../services/modal.service'
import { MovieService } from '../../../../services/movie.service'
import { Movie } from '../../../../models/movie.model'
 
@Component({
  selector: 'details-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css'
})
export class DetailsModalComponent implements OnChanges {
  @Input() currentMovie: Movie | null = null
  @Output() movieUpdated = new EventEmitter<Movie>()
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>

  form: FormGroup
  file: File | null = null
  isDragover = false

  constructor(
    private fb: FormBuilder, 
    public modalService: ModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      title: [''],
      description: ['']
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentMovie'] && this.currentMovie) {
      // Reset the form before setting new values
      this.form.reset();

      // Set new values
      this.form.patchValue({
        title: this.currentMovie.title,
        description: this.currentMovie.description
      })
      this.cdr.detectChanges()
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.file = input.files[0]
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    
    if (event.dataTransfer?.files.length) {
      this.file = event.dataTransfer.files[0]
    }
  }

  async onSubmit() {
    if (this.currentMovie) {
      const updatedMovie: Movie = {
        ...this.currentMovie,
        title: this.form.get('title')?.value || '',
        description: this.form.get('description')?.value || '',
      }

      this.movieUpdated.emit(updatedMovie)
      this.cdr.detectChanges()

      try {
        const formData = new FormData()
        formData.append('title', this.form.get('title')?.value || '')
        formData.append('description', this.form.get('description')?.value || '')
        if (this.file) {
          formData.append('movie_file', this.file)
        }
        const response = await MovieService.updateMovie(this.currentMovie.id, formData)
        
        console.log('Movie updated:', response)
        
        this.modalService.close('details')
      } catch (error) {
        console.error('Failed to create movie:', error)
      }
    } else {
      console.log('Form Invalid:', {
        formValid: this.form.valid,
        fileExists: !!this.file
      });
    }
  }
}