# Netflix UI Clone

A frontend clone of the Netflix streaming platform built with Angular 16. Pulls live movie and TV data from the TMDb API and renders it in a familiar, responsive interface with content carousels, a hero banner, and detail modals.

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Angular 16                          |
| Language      | TypeScript 5                        |
| Styling       | SCSS + Angular Material 16          |
| HTTP/State    | RxJS 7, HttpClient, BehaviorSubject |
| API           | [TMDb API](https://www.themoviedb.org/documentation/api) |
| Testing       | Karma + Jasmine                     |

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:4200)
npm start

# production build
npm run build

# run unit tests
npm test
```

> The app uses the TMDb API. The key is currently hardcoded in `src/app/services/tmdb.service.ts` — see the improvements section below.

## Project Structure

```
src/app/
├── components/
│   ├── header/           # Sticky nav bar with search toggle and profile menu
│   ├── hero-banner/      # Full-width featured content showcase
│   ├── movie-card/       # Content card with hover overlay and loading skeleton
│   ├── content-row/      # Horizontally scrollable carousel of cards
│   └── movie-detail/     # Detail modal with backdrop, description, and actions
├── pages/
│   └── home/             # Main landing page — assembles all content rows
├── services/
│   ├── tmdb.service.ts   # TMDb API calls (trending, popular, originals)
│   ├── content.service.ts# Aggregates API data into content rows
│   ├── modal.service.ts  # Manages modal open/close state
│   └── auth.service.ts   # Auth stub (not yet implemented)
├── models/               # TypeScript interfaces (Content, ContentRow, etc.)
├── app-routing.module.ts # Route definitions
└── app.module.ts         # Root module
```

## Key Features

- **Hero Banner** — randomly selected trending title with backdrop image, overview text, and play/add-to-list actions
- **Content Carousels** — smooth-scrolling rows for Trending, Popular, and Netflix Originals with arrow navigation
- **Detail Modal** — click any card to see full details, ratings, and similar titles in an overlay
- **Loading Skeletons** — placeholder shimmer on cards while images load
- **Responsive Layout** — adapts across mobile, tablet, and desktop breakpoints
- **API Fallback** — gracefully falls back to mock data when the TMDb API is unreachable
- **Sticky Header** — nav bar becomes opaque on scroll, with animated search field toggle

## What I'd Improve

- **Move the API key** out of source code and into environment variables
- **Implement authentication** — the auth service is stubbed but has no login/signup flow
- **Wire up search** — the header has a search toggle but it doesn't query anything yet
- **Build out remaining routes** — TV Shows, My List, and a `/watch/:id` video player page are planned but not implemented
- **Add global state management** (NgRx or a lightweight alternative) as the app grows beyond a few BehaviorSubjects
- **Improve test coverage** — currently only default scaffold specs exist
- **Paginate or lazy-load** content rows instead of fetching everything on initial load
