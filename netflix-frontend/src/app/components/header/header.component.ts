import { Component, HostListener } from '@angular/core';

/**
 * Top navigation header with Netflix-style scroll behavior.
 *
 * The header starts transparent and becomes opaque once the user
 * scrolls past a threshold, mimicking Netflix's sticky nav effect.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSearchVisible = false;
  isMobileNavVisible = false;
  isScrolled = false;

  /**
   * Pixel threshold before the header switches to its opaque "scrolled" style.
   * 50 px keeps the header transparent while the hero banner is fully visible.
   */
  private static readonly SCROLL_THRESHOLD = 50;

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  toggleMobileNav() {
    this.isMobileNavVisible = !this.isMobileNavVisible;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > HeaderComponent.SCROLL_THRESHOLD;
  }
}