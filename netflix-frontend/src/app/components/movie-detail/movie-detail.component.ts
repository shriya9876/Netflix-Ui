import { Component, Input } from '@angular/core';
import { Content } from '../../models/content.interface';
import { ModalService } from 'src/app/services/modal.service';

/**
 * Modal dialog that shows full details for a selected content item
 * including backdrop image, description, rating, and similar titles.
 */
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  /** The content item whose details are displayed in the modal. */
  @Input() content!: Content;

  similarMovies: Content[] = [];

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }

  playContent() {
    console.log('Playing:', this.content.title);
  }

  addToList() {
    console.log('Added to list:', this.content.title);
  }

  onCardClick(movie: Content) {
    this.modalService.openModal(movie);
  }
}
