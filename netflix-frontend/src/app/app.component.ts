import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Content } from './models/content.interface';
import { ModalService } from './services/modal.service';
import { ContentService } from './services/content.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  featuredContent!: Content;
  trendingContent: Content[] = [];
  popularContent: Content[] = [];
  originalContent: Content[] = [];
  selectedContent: Content | null = null;

  constructor(private contentService: ContentService, private modalService: ModalService) {
     this.modalService.modalState$.subscribe(modalState => {
      this.selectedContent = modalState.content;
   });}


  onCardClick(content: Content) {
    console.log('Content clicked:', content.title);
    this.modalService.openModal(content);
  }

   onPlayContent(content: Content) {
    console.log('Playing content:', content.title);
    // TODO: Navigate to player in Phase 3
  }

   onAddToList(content: Content) {
    console.log('Added to list:', content.title);
    // TODO: Add to user's list functionality
  }

  ngOnInit() {
    this.loadContent();
  }

  private loadContent() {
  
    // Use forkJoin to load all content simultaneously
    forkJoin({
      trending: this.contentService.getTrendingContent(),
      popular: this.contentService.getPopularContent(),
      originals: this.contentService.getNetflixOriginals()
    }).subscribe({
      next: (results) => {
        console.log('All content loaded:', results);
        
        // Assign the results
        this.trendingContent = results.trending;
        this.popularContent = results.popular;
        this.originalContent = results.originals;
        
        // Set featured content from trending
        if (this.trendingContent.length > 0) {
          this.featuredContent = this.trendingContent[0];
          console.log('Featured Content Set:', this.featuredContent);
        }
        
        // Debug logging
        console.log('Trending Content:', this.trendingContent.length, 'items');
        console.log('Popular Content:', this.popularContent.length, 'items');
        console.log('Original Content:', this.originalContent.length, 'items');
      },
      error: (error) => {
        console.error('Error loading content:', error);
        
        // Fallback to mock data if API fails
        this.loadMockData();
      }
    });
}

  private loadMockData() {
    console.log('Loading mock data as fallback...');
    
    // Generate mock data for each section
    this.trendingContent = this.generateMockContent(20, 'Trending');
    this.popularContent = this.generateMockContent(20, 'Popular');
    this.originalContent = this.generateMockContent(20, 'Original');
    
    if (this.trendingContent.length > 0) {
      this.featuredContent = this.trendingContent[0];
    }
  }

   private generateMockContent(count: number, prefix: string): Content[] {
    const mockContent: Content[] = [];
    
    for (let i = 1; i <= count; i++) {
      mockContent.push({
        id: Date.now() + i,
        title: `${prefix} Movie ${i}`,
        overview: `This is a ${prefix.toLowerCase()} movie description for movie ${i}. It has an engaging plot and great characters.`,
        poster_path: '/placeholder-poster.jpg',
        backdrop_path: '/placeholder-backdrop.jpg',
        genre_ids: [28, 12, 16], // Action, Adventure, Animation
        vote_average: 7.5 + (Math.random() * 2),
        release_date: `${2020 + Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        popularity: Math.random() * 1000
      });
    }
    return mockContent;
}
}