import { Injectable, signal } from '@angular/core'
 
// Define a type for modal names to ensure type safety
type ModalType = 'upload' | 'details'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Use a map of signals to track different modal states
  private modalStates = new Map<ModalType, ReturnType<typeof signal<boolean>>>()

  constructor() {
    // Initialize signals for each modal type
    this.modalStates.set('upload', signal(false))
    this.modalStates.set('details', signal(false))
  }

  // Generic method to open a specific modal
  open(modalType: ModalType) {
    const modalSignal = this.modalStates.get(modalType)
    if (modalSignal) {
      modalSignal.set(true)
    }
  }

  // Generic method to close a specific modal
  close(modalType: ModalType) {
    const modalSignal = this.modalStates.get(modalType)
    if (modalSignal) {
      modalSignal.set(false)
    }
  }

  // Method to check if a specific modal is open
  isOpen(modalType: ModalType): boolean {
    const modalSignal = this.modalStates.get(modalType)
    return modalSignal ? modalSignal() : false
  }

  // Optional: Get the signal for a specific modal (useful for reactive programming)
  getModalSignal(modalType: ModalType) {
    return this.modalStates.get(modalType)
  }
}