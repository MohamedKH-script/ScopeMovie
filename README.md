# ScopeMovie

> 🚧 **Work in progress:** this project is still under development. Some features are not finished yet.

ScopeMovie is a movie and TV show discovery web app built with React, Vite and Tailwind CSS, using data from the TMDB API. It has its own Node.js/Express backend with a PostgreSQL database for user accounts. Browse what's trending, search for any title, explore content by genre, sign up or sign in, and (soon) keep your own watchlist.

## Features

- [x] Home page with trending movies
- [x] Live movie search
- [x] Poster fallback and loading/error states
- [x] Movies page with genre sections
- [x] TV Shows page with genre sections
- [x] Sign up / Sign in with a Node.js + PostgreSQL backend
- [ ] My List (save favorites)

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- React Router
- TMDB API

**Backend**
- Node.js + Express
- PostgreSQL
- express-session + connect-pg-simple (sessions stored in the database)
- bcryptjs (password hashing)

## Project Structure

```
movie-react-app/
  server/        <- Express API (auth, sessions)
  src/           <- React app
```

## Getting Started

### 1. Frontend

```bash
npm install
```

Create a `.env` file in the project root with your TMDB Read Access Token:

```
VITE_TMDB_API_KEY=your_read_access_token
```

Start the dev server:

```bash
npm run dev
```

### 2. Backend

```bash
cd server
npm install
```

Create a PostgreSQL database:

```sql
CREATE DATABASE scopemovie;
```

Create `server/.env`:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=scopemovie
DB_PASSWORD=your_postgres_password
DB_PORT=5432
SESSION_SECRET=a_long_random_string
PORT=3000
```

Start the API:

```bash
npm run dev
```

Both the frontend (`http://localhost:5173`) and backend (`http://localhost:3000`) need to be running at the same time. Vite proxies `/api` requests to the backend.

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.