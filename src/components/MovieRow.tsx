import { Card } from "antd";
import type { Movie } from "../utils/types";
import { toggleFavorite } from "../utils/toggleFavorite";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { useState } from "react";
import PreviewMovie from "./PreviewMovie";
import AddMovie from "./AddMovie";

interface MovieRowProps {
  movies: Movie[];
  refreshMovies: () => void;
}

function MovieRow({ movies, refreshMovies }: MovieRowProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };
  const handleAddOpen = () => {
    setIsAddModalOpen(true);
  };
  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

  const handleFavorite = async (movie: Movie) => {
    const updated = await toggleFavorite(movie);
    if (updated) refreshMovies();
  };
  return movies.length === 0 ? (
    <>
      <div
        style={{
          margin: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          height: 300,
          background: "#dbdbdb",
          borderRadius: "4px",
          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.05)",
          fontSize: 70,
          color: "#1890ff",
        }}
        onClick={handleAddOpen}
      >
        <p style={{ fontSize: "16px", color: "#1890ff", fontWeight: "bold" }}>
          ADD MOVIE
        </p>
        <PlusCircleTwoTone />
      </div>
      <AddMovie
        isModalOpen={isAddModalOpen}
        handleClose={handleAddClose}
        refreshMovies={refreshMovies}
      />
    </>
  ) : (
    <>
      <div className="movie-row">
        {movies.map((movie) => (
          <Card
            key={movie.Title}
            hoverable
            onClick={() => handleOpen(movie)}
            cover={
              <img
                alt={movie.Title}
                src={movie.Poster}
                style={{
                  width: "200px",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            }
            style={{
              width: 200,
              marginRight: 16,
              background: "#dbdbdb",
              border: "none",
              boxShadow: "0 4px 15px rgba(255, 255, 255, 0.05)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: 25,
                cursor: "pointer",
                color: movie.Favorite ? "red" : "white",
              }}
              onClick={() => handleFavorite(movie)}
            >
              {movie.Favorite ? <HeartFilled /> : <HeartOutlined />}
            </div>
            <Card.Meta
              title={movie.Title}
              description={
                <>
                  <span>⭐ {movie.imdbRating || "N/A"}</span>
                  <br />
                  <span>{movie.Released || "N/A"}</span>
                </>
              }
            />
          </Card>
        ))}

        <style>{`
  .movie-row {
    display: flex;
    overflow-x: auto;
    padding: 20px;
    scrollbar-width: none;
  }

  .movie-row::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    .movie-row {
      width: 80vw;
    }
  }
  
`}</style>
      </div>
      <PreviewMovie
        movie={selectedMovie}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        refreshMovies={refreshMovies}
      />
    </>
  );
}

export default MovieRow;
