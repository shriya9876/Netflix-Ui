import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Low-level service that talks directly to the TMDb (The Movie Database) REST API.
 *
 * All endpoints require an API key which is read from the environment config.
 * Higher-level services (e.g. {@link ContentService}) consume these observables
 * and map the raw responses into domain models.
 */
@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = environment.tmdbApiKey;
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  /** Fetches movies trending this week. */
  getTrendingMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`);
  }

  /** Fetches the current list of popular movies. */
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  /**
   * Fetches TV shows produced for Netflix.
   *
   * Network ID 213 is Netflix's identifier in TMDb's network registry.
   */
  getNetflixOriginals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_networks=213`);
  }

  /** Fetches full details for a single movie by its TMDb ID. */
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }
}
