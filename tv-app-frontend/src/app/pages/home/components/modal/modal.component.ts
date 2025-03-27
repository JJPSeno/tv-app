import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ModalService } from '../../../../services/modal.service'
import { MovieService } from '../../../../services/movie.service'
 
@Component({
  selector: 'upload-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>
  @Output() movieUploaded = new EventEmitter<void>()

  form: FormGroup
  file: File | null = null
  isDragover = false

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public modalService: ModalService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  sanitizeInput(input: string) {
    return this.sanitizer.sanitize(1, input) || ''; // Sanitizes HTML input
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
    if (this.form.valid && this.file) {
      try {
        const formData = new FormData()
        formData.append('title', this.sanitizeInput(this.form.get('title')?.value || ''))
        formData.append('description', this.sanitizeInput(this.form.get('description')?.value || ''))
        formData.append('movie_file', this.file)
        const response = await MovieService.createMovie(formData)
        
        console.log('Movie created:', response)
        this.movieUploaded.emit()
        this.modalService.close('upload')
      } catch (error) {
        console.error('Failed to create movie:', error)
      }
    } else {
      // Log form validation status
      console.log('Form Invalid:', {
        formValid: this.form.valid,
        fileExists: !!this.file
      });
    }
  }
}