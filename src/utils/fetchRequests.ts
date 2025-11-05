import type { Movie } from "./types";

const BASE_URL = "http://localhost:4000/movies";

export const fetchRequests = {
  //  Get all movies
  async getMovies(): Promise<Movie[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
  },

  //  Create new movie
  async createMovie(movie: Partial<Omit<Movie, "id">>): Promise<Movie> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    if (!res.ok) throw new Error("Failed to create movie");
    return res.json();
  },

  //  Update movie
  async updateMovie(id: string, updatedData: Partial<Movie>): Promise<Movie> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update movie");
    return res.json();
  },

  // Delete movie
  async deleteMovie(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete movie");
  },
};
