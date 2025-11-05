import { Spin } from "antd";
import MovieRow from "./MovieRow";
import type { Movie } from "../utils/types";

interface ToWatchProps {
  moviesList: Movie[];
  loading: boolean;
  refreshMovies: () => void;
}

export default function ToWatch({
  moviesList,
  loading,
  refreshMovies,
}: ToWatchProps) {
  const filteredMovies = moviesList.filter((movie) => movie.ToWatch);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <h3 style={{ margin: "0 20px" }}>To Watch</h3>

      <MovieRow movies={filteredMovies} refreshMovies={refreshMovies} />
    </>
  );
}
