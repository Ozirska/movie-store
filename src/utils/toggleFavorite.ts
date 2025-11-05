import { fetchRequests } from "./fetchRequests";
import type { Movie } from "./types";

export async function toggleFavorite(movie: Movie) {
  const updated = await fetchRequests.updateMovie(movie.id, {
    Favorite: !movie.Favorite,
  });
  return updated;
}
