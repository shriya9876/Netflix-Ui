import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Content } from '../../models/content.interface';

/**
 * Horizontally-scrollable row of {@link MovieCardComponent} items.
 *
 * Renders a titled row with left/right navigation arrows that appear
 * on hover when the content overflows the viewport.
 */
@Component({
  selector: 'app-content-row',
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.scss']
})
export class ContentRowComponent implements AfterViewInit {
  /** Section heading displayed above the row (e.g. "Trending Now"). */
  @Input() title!: string;

  /** Array of content items to display as cards. */
  @Input() contents: Content[] = [];

  /** Size variant forwarded to each `app-movie-card`. */
  @Input() cardSize: 'small' | 'medium' | 'large' = 'medium';

  /** Emitted when a card in the row is clicked. */
  @Output() cardClicked = new EventEmitter<Content>();

  /** Emitted when a card's play button is clicked. */
  @Output() playClicked = new EventEmitter<Content>();

  /** Emitted when a card's add-to-list button is clicked. */
  @Output() addToListClicked = new EventEmitter<Content>();

  @ViewChild('slider') slider!: ElementRef;

  showArrows = false;
  canScrollLeft = false;
  canScrollRight = true;
  isHovered = false;

  ngAfterViewInit() {
    this.checkScrollability();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScrollability();
  }

  onCardClick(content: Content) {
    this.cardClicked.emit(content);
  }

  onPlayClick(content: Content) {
    this.playClicked.emit(content);
  }

  onAddToListClick(content: Content) {
    this.addToListClicked.emit(content);
  }

  onRowHover() {
    this.isHovered = true;
    this.checkScrollability();
  }

  onRowLeave() {
    this.isHovered = false;
  }

  scrollLeft() {
    const scrollAmount = this.getScrollAmount();
    this.slider.nativeElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });

    // Wait for the smooth-scroll animation (~300 ms) before recalculating arrow visibility.
    setTimeout(() => this.checkScrollability(), 300);
  }

  scrollRight() {
    const scrollAmount = this.getScrollAmount();
    this.slider.nativeElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScrollability(), 300);
  }

  onScroll() {
    this.checkScrollability();
  }

  private checkScrollability() {
    if (!this.slider) return;

    const element = this.slider.nativeElement;
    const { scrollLeft, scrollWidth, clientWidth } = element;

    this.canScrollLeft = scrollLeft > 0;
    // 10 px buffer accounts for sub-pixel rounding so the arrow hides reliably at the end.
    this.canScrollRight = scrollLeft < (scrollWidth - clientWidth - 10);
    this.showArrows = this.contents.length > 0 && scrollWidth > clientWidth;
  }

  /**
   * Calculates how far (in pixels) to scroll per arrow click.
   *
   * Scrolls by (visible cards − 1) card widths so the last visible card
   * becomes the first, giving the user a sense of continuity.
   */
  private getScrollAmount(): number {
    if (!this.slider) return 0;

    const containerWidth = this.slider.nativeElement.clientWidth;
    const cardWidth = this.getCardWidth();
    const gap = 8;
    const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
    const scrollCards = Math.max(1, visibleCards - 1);

    return scrollCards * (cardWidth + gap);
  }

  /**
   * Returns the expected card width based on the current size variant
   * and viewport width.
   *
   * Breakpoint: 768 px — below this the cards shrink for mobile layouts.
   */
  private getCardWidth(): number {
    switch (this.cardSize) {
      case 'small': return window.innerWidth <= 768 ? 140 : 180;
      case 'large': return window.innerWidth <= 768 ? 200 : 280;
      default: return window.innerWidth <= 768 ? 160 : 220;
    }
  }

  trackByContent(index: number, content: Content): number {
    return content.id;
  }

  getScrollProgress(): number {
    if (!this.slider) return 0;

    const element = this.slider.nativeElement;
    const { scrollLeft, scrollWidth, clientWidth } = element;

    if (scrollWidth <= clientWidth) return 100;

    return (scrollLeft / (scrollWidth - clientWidth)) * 100;
  }
}
