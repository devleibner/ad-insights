# Ad Insights Explorer Lite Frontend

This is the frontend for Ad Insights Explorer Lite, built with React, TypeScript, and Vite. It provides a user interface for exploring post data, viewing anomalies, and summary statistics from the backend API.

## Features

- View all posts
- Detect and display anomalies (short titles, duplicates, similar titles)
- Show summary statistics (top users by unique words, most common words)
- Responsive and modern UI

## Project Structure

- `src/`
  - `api/` — API logic for communicating with the backend
  - `components/` — UI components (tables, panels, tag cloud, etc.)
  - `lib/` — Custom hooks and utilities
  - `assets/` — Static assets
  - `App.tsx` — Main app component
  - `main.tsx` — Entry point
- `public/` — Static files

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Run tests:**
   ```bash
   npm test
   ```

## API Integration

- The frontend expects the backend API to be running (see backend/README.md).
- Update API URLs in `src/api/` if your backend runs on a different host/port.

## Linting & Formatting

- ESLint and Prettier are configured for code quality and consistency.

## Notes

- Do **not** commit `node_modules/` or build output. Use `.gitignore`.
- For environment variables, use a `.env` file (not included by default).

---

For more details, see the code in the `src/` directory.
s
