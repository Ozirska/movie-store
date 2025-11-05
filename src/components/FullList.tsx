import { useState } from "react";
import { Spin } from "antd";
import MovieRow from "./MovieRow";
import type { Movie } from "../utils/types";

interface FullListProps {
  moviesList: Movie[];
  loading: boolean;
  refreshMovies: () => Promise<void>;
}

export default function FullList({
  moviesList,
  loading,
  refreshMovies,
}: FullListProps) {
  const [searchChar, setSearchChar] = useState("");

  const filteredMovies = moviesList.filter((movie) =>
    movie.Title.toLowerCase().includes(searchChar.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div
        style={{ padding: "20px", display: "flex", justifyContent: "center" }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchChar}
          onChange={(e) => setSearchChar(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "100%",
            maxWidth: "400px",
            minWidth: "150px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <h3 style={{ margin: "0 20px" }}>
        {searchChar ? "Search results" : "All movies"}
      </h3>

      <MovieRow movies={filteredMovies} refreshMovies={refreshMovies} />
    </>
  );
}
