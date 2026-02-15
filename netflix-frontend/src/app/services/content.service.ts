import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TmdbService } from './tmdb.service';
import { Content } from '../models/content.interface';

/**
 * Application-level content service that wraps {@link TmdbService}.
 *
 * Each method fetches a TMDb endpoint and maps the raw API response
 * (`{ results: [...] }`) into a typed `Content[]` array consumed by components.
 */
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private tmdbService: TmdbService) {}

  /** Returns this week's trending movies as `Content[]`. */
  getTrendingContent(): Observable<Content[]> {
    return this.tmdbService.getTrendingMovies().pipe(
      map(response => response.results)
    );
  }

  /** Returns currently popular movies as `Content[]`. */
  getPopularContent(): Observable<Content[]> {
    return this.tmdbService.getPopularMovies().pipe(
      map(response => response.results)
    );
  }

  /** Returns Netflix-produced TV originals as `Content[]`. */
  getNetflixOriginals(): Observable<Content[]> {
    return this.tmdbService.getNetflixOriginals().pipe(
      map(response => response.results)
    );
  }
}
