import React, { useState } from "react";
import {
  Modal,
  Descriptions,
  Image,
  Button,
  message,
  Popconfirm,
  Input,
  Switch,
} from "antd";
import type { Movie } from "../utils/types";
import { fetchRequests } from "../utils/fetchRequests";

interface PreviewMovieProps {
  movie: Movie | null;
  isModalOpen: boolean;
  handleClose: () => void;
  refreshMovies: () => void;
}

const PreviewMovie: React.FC<PreviewMovieProps> = ({
  movie,
  isModalOpen,
  handleClose,
  refreshMovies,
}) => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"view" | "edit">("view");
  const [editedMovie, setEditedMovie] = useState<Movie | null>(movie);
  const [posterURL, setPosterURL] = useState("");

  if (!movie) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetchRequests.deleteMovie(movie.id);
      message.success(`Deleted "${movie.Title}"`);
      refreshMovies();
      handleClose();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete movie");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditedMovie(movie);
    setViewMode("edit");
  };

  const handleSave = async () => {
    if (!editedMovie) return;
    try {
      setLoading(true);
      await fetchRequests.updateMovie(movie.id, editedMovie);
      message.success(`Updated "${editedMovie.Title}"`);
      refreshMovies();
      setViewMode("view");
    } catch (err) {
      console.error(err);
      message.error("Failed to update movie");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setViewMode("view");
    setEditedMovie(movie);
  };

  const handleChange = (field: keyof Movie, value: any) => {
    if (!editedMovie) return;
    setEditedMovie({ ...editedMovie, [field]: value });
  };

  const data = viewMode === "view" ? movie : editedMovie!;

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={700}
        title={viewMode === "view" ? movie.Title : `Editing: ${movie.Title}`}
      >
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {viewMode === "view" ? (
            <>
              <Popconfirm
                title="Delete this movie?"
                description="Are you sure you want to delete this movie?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger loading={loading}>
                  Delete
                </Button>
              </Popconfirm>
              <Button onClick={handleEdit}>Edit</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={handleSave} loading={loading}>
                Save
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </>
          )}
        </div>

        <div className="movie-layout">
          <div>
            <Image
              src={posterURL ? posterURL : movie.Poster}
              alt={movie.Title}
              width={200}
              height={300}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            {viewMode === "edit" && (
              <div style={{ marginTop: 8 }}>
                <Input
                  placeholder="Enter new poster URL"
                  value={data.Poster}
                  onChange={(e) => {
                    handleChange("Poster", e.target.value);
                    setPosterURL(e.target.value);
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Released">
                {viewMode === "view" ? (
                  data.Released
                ) : (
                  <Input
                    value={data.Released}
                    onChange={(e) => handleChange("Released", e.target.value)}
                  />
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Genre">
                {viewMode === "view" ? (
                  data.Genre
                ) : (
                  <Input
                    value={data.Genre}
                    onChange={(e) => handleChange("Genre", e.target.value)}
                  />
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Director">
                {viewMode === "view" ? (
                  data.Director
                ) : (
                  <Input
                    value={data.Director}
                    onChange={(e) => handleChange("Director", e.target.value)}
                  />
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Actors">
                {viewMode === "view" ? (
                  data.Actors
                ) : (
                  <Input
                    value={data.Actors}
                    onChange={(e) => handleChange("Actors", e.target.value)}
                  />
                )}
              </Descriptions.Item>

              <Descriptions.Item label="IMDb Rating">
                {viewMode === "view" ? (
                  data.imdbRating
                ) : (
                  <Input
                    value={data.imdbRating}
                    onChange={(e) => handleChange("imdbRating", e.target.value)}
                  />
                )}
              </Descriptions.Item>

              <Descriptions.Item label="To Watch">
                {viewMode === "view" ? (
                  data.ToWatch ? (
                    "Yes"
                  ) : (
                    "No"
                  )
                ) : (
                  <Switch
                    checked={data.ToWatch}
                    onChange={(val) => handleChange("ToWatch", val)}
                  />
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Favorite">
                {viewMode === "view" ? (
                  data.Favorite ? (
                    "❤️"
                  ) : (
                    "—"
                  )
                ) : (
                  <Switch
                    checked={data.Favorite}
                    onChange={(val) => handleChange("Favorite", val)}
                  />
                )}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 15 }}>
              <h4>Description</h4>
              {viewMode === "view" ? (
                <p>{data.Plot || "—"}</p>
              ) : (
                <Input.TextArea
                  rows={3}
                  value={data.Plot}
                  onChange={(e) => handleChange("Plot", e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
      <style>{`
  .movie-layout {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  @media (max-width: 600px) {
    .movie-layout {
      flex-direction: column;
      align-items: center;
    }
  }
`}</style>
    </>
  );
};

export default PreviewMovie;
