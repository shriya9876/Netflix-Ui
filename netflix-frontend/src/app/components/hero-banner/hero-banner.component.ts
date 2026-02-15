import { Component, Input } from '@angular/core';
import { Content } from 'src/app/models/content.interface';

/**
 * Full-width hero banner that showcases a single featured content item.
 */
@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
  /** The content item displayed in the hero section. */
  @Input() featuredContent!: Content;

  ngOnChanges() {
    console.log('Featured Content:', this.featuredContent);
  }

  playContent() {
    // TMDb movies use `title`, TV shows use `name` — fall back accordingly.
    console.log('Playing:', this.featuredContent.title || this.featuredContent.name);
  }

  addToList() {
    console.log('Added to list:', this.featuredContent.title || this.featuredContent.name);
  }
}