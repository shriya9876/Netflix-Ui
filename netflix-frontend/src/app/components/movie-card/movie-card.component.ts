import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Content } from '../../models/content.interface';

/**
 * Card component that displays a single content item with poster art,
 * hover effects, and action buttons (play / add-to-list).
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  /** The content item to render. */
  @Input() content!: Content;

  /** Visual size variant used by the parent row layout. */
  @Input() size: 'small' |'medium' | 'large' = 'medium';

  /** Emitted when the card itself is clicked (opens detail modal). */
  @Output() cardClicked = new EventEmitter<Content>();

  /** Emitted when the play button is clicked. */
  @Output() playClicked = new EventEmitter<Content>();

  /** Emitted when the add-to-list button is clicked. */
  @Output() addToListClicked = new EventEmitter<Content>();

  isHovered = false;
  imageLoaded = false;
  imageError = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }

  onCardClick(): void {
    this.cardClicked.emit(this.content);
  }

  onPlayClick(event: Event) {
    // Stop propagation so the card-level click handler doesn't also fire.
    event.stopPropagation();
    this.playClicked.emit(this.content);
  }

  onAddToListClick(event: Event) {
    event.stopPropagation();
    this.addToListClicked.emit(this.content);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  onImageError() {
    this.imageError = true;
    this.imageLoaded = false;
  }
}
