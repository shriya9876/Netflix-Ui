import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Content } from '../models/content.interface';

/**
 * Manages the open/close state of the content-detail modal.
 *
 * Components subscribe to {@link modalState$} to reactively show or hide the
 * modal. Opening the modal also sets `document.body.style.overflow` to
 * `'hidden'` to prevent background scrolling while the modal is visible.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  /** Observable stream of the current modal state (content + open flag). */
  private modalState = new BehaviorSubject<{ content: Content | null, isOpen: boolean }>({
    content: null,
    isOpen: false
  });
  modalState$ = this.modalState.asObservable();

  openModal(content: Content) {
    this.modalState.next({ content, isOpen: true });
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalState.next({ content: null, isOpen: false });
    document.body.style.overflow = 'auto';
  }

  get isOpen(): boolean {
    return this.modalState.value.isOpen;
  }

  get currentContent(): Content | null {
    return this.modalState.value.content;
  }
}
