import { useEffect, useState } from "react";
import "./App.css";
import FullList from "./components/FullList";
import Header from "./components/Header";
import ToWatch from "./components/ToWatch";
import { fetchRequests } from "./utils/fetchRequests";
import type { Movie } from "./utils/types";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchRequests.getMovies();
      setMovies(data);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="global_wrappwr">
      <Header refreshMovies={loadMovies} />
      <FullList
        moviesList={movies}
        loading={loading}
        refreshMovies={loadMovies}
      />
      <ToWatch
        moviesList={movies}
        loading={loading}
        refreshMovies={loadMovies}
      />
    </div>
  );
}

export default App;
