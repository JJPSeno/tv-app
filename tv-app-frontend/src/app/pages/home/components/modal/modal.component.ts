import { Component, signal } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ModalService } from '../../../../services/modal.service'
 
@Component({
  selector: 'modal-section',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  form: FormGroup
  file: File | null = null
  isDragover = false

  constructor(private fb: FormBuilder, public modalService: ModalService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    if (event.dataTransfer?.files.length) {
      this.file = event.dataTransfer.files[0]
    }
  }

  onSubmit() {
    if (this.form.valid && this.file) {
      console.log({ ...this.form.value, file: this.file })
      this.modalService.close()
    }
  }
}