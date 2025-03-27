import { Component } from '@angular/core';
import { ModalService } from '../../../../services/modal.service'

@Component({
  selector: 'details-button',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  constructor(private modalService: ModalService) {}
 
  openModal() {
    this.modalService.open('details')
  }
}