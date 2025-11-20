# Kingscrowd Active Raises Viewer

A Nuxt 3 application that displays active Reg CF and Reg A+ crowdfunding raises from the Kingscrowd API.

## Features

- Lists active raises filtered by Reg CF and Reg A+ crowdfunding types
- Displays: Raise Name, Status, Platform, Money Raised to Date, and Valuation
- Pagination support (25 deals per page)
- Loading, empty, and error states
- CSV export functionality
- Secure API key handling via server-side routes

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```
KINGSCROWD_API_KEY=your_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tradeoffs & Decisions

- **Server-side filtering**: Filters are applied server-side via API query params for better performance and to reduce client-side data transfer
- **Client-side pagination**: Pagination is handled client-side with URL query params for better UX and shareable URLs
- **CSV export**: Exports only the current page's visible rows (could be extended to export all pages)
- **TypeScript**: Used for type safety, though API response types are inferred from runtime data

## Development Notes

 AI assistance (Cursor AI) was used selectively to enhance component styling and UI consistency. Specifically, AI was used to improve the visual design and Tailwind CSS implementation for components like `RaisesTable`, `Pagination`, `EmptyState`, and `ErrorMessage` to ensure a polished components development quickly
## What I'd Do Next

- Add search/filter UI for additional filtering options
- Implement server-side rendering (SSR) for better SEO and initial load performance
- Add unit tests for the server route and components
- Implement caching for API responses to reduce rate limit issues
- Add loading skeletons instead of spinner for better perceived performance
- Support exporting all pages, not just the current page
