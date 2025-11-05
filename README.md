# Movies Store

**Short repository description (for GitHub):**

> Movies Store — A responsive React app to manage your watched / to-watch / favorite movies. Ships with a JSON Server mock API for local development.

---

## About

Movies Store is a small, responsive React web application that lets users store and manage a personal movie catalog. You can view a list of movies (poster, title, rating, release date), search by title, open a detailed page with full movie info (description, actors, director, genre, rating), add / edit / delete entries, and mark movies as favorites.

This repository includes a **JSON Server** (`db.json`) that simulates a REST API for easy local development.

---

## Features

- Responsive UI (mobile / tablet / desktop)
- Movies list with image, title, rating and release date
- Search movies by title
- Movie detail page with description, actors, director, genre, rating
- Add new movies (client-side form)
- Edit existing movies
- Delete movies
- Toggle movies as **Favourites**
- Uses a JSON Server to simulate REST API (`GET`, `POST`, `PATCH`, `DELETE`)

---

## Tech stack

- React
- TypeScript
- JSON Server for mock REST API
- UI library Ant Design

---

## Getting started (local)

> These instructions assume you have Node.js and npm installed.

1. **Clone the repo**

```bash
git clone https://github.com/Ozirska/movie-store.git
cd task-movie-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start JSON Server** (mock API)

The repository includes `db.json` (the movie file). Run JSON Server on port `4000` to serve it as a REST API:

```bash
npx json-server --watch db.json --port 4000
```

This will expose endpoints such as:

- `GET http://localhost:4000/movies` — list all movies
- `GET http://localhost:4000/movies/:id` — single movie
- `POST http://localhost:4000/movies` — add a movie
- `PUT/PATCH http://localhost:4000/movies/:id` — edit a movie
- `DELETE http://localhost:4000/movies/:id` — remove a movie

1. **Run the React app (development)**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the Vite dev server port shown) in your browser.

---

## API / Data format

The `movies` resource stored in `db.json` follows a simple structure. Example movie object:

```json
{
  "id": "16",
  "ToWatch": false,
  "Favorite": false,
  "ComingSoon": true,
  "Title": "Luke Cage",
  "Year": "2016–",
  "Rated": "TV-MA",
  "Released": "30 Sep 2016",
  "Runtime": "55 min",
  "Genre": "Action, Crime, Drama",
  "Director": "N/A",
  "Writer": "Cheo Hodari Coker",
  "Actors": "Mahershala Ali, Mike Colter, Frankie Faison, Erik LaRay Harvey",
  "Plot": "Given superstrength and durability by a sabotaged experiment, a wrongly accused man escapes prison to become a superhero for hire.",
  "Language": "English",
  "Country": "USA",
  "Awards": "N/A",
  "Poster": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA/C0SVRmy//9k=",
  "Metascore": "N/A",
  "imdbRating": "N/A",
  "imdbVotes": "N/A",
  "imdbID": "tt3322314",
  "Type": "series",
  "totalSeasons": "1",
  "Response": "True",
  "Images": [
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjc1NjI0NV5BMl5BanBnXkFtZTgwNzA0NzY0ODE@._V1_SY1000_CR0,0,1497,1000_AL_.jpg"
  ]
}
```

Important fields used by the app:

- `id` — unique movie id (number)
- `Title` — name of the movie
- `Poster` — URL to the poster image
- `imdbRating` — rating values
- `Released` — release date
- `Plot` — description
- `Actors`, `Director`, `Genre` — details shown on the detail page
- `Favorite` — boolean to mark favourite
- `ToWatch` — boolean to mark movies planing to watch

---

## Improvements

If I had more time to work on this project, I would:

- Add more sections and features.

- Add smooth animations and transitions for better user experience.

- Replace JSON Server with a real backend and deploy the entire app.

- Focus more on accessibility.
