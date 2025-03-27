import { Component, ViewChild, ElementRef } from '@angular/core'
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

  form: FormGroup
  file: File | null = null
  isDragover = false

  constructor(
    private fb: FormBuilder, 
    public modalService: ModalService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
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
        formData.append('title', this.form.get('title')?.value || '')
        formData.append('description', this.form.get('description')?.value || '')
        formData.append('movie_file', this.file)
        const response = await MovieService.createMovie(formData)
        
        console.log('Movie created:', response)
        
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