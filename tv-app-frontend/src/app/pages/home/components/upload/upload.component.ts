import { Component } from '@angular/core'
import { ModalService } from '../../../../services/modal.service'
 
@Component({
  selector: 'upload-button',
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  constructor(private modalService: ModalService) {}
 
  openModal() {
    this.modalService.open('upload')
  }
}